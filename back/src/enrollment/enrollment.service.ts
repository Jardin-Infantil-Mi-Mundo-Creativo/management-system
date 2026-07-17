import { Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import type {
  EnrollmentWithNoFiles,
  EnrollmentFiles,
} from './enrollment.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { Bucket } from '@google-cloud/storage';
import { Enrollment } from './enrollment.entity';
import {
  getEnrollmentState,
  normalizeWithdrawalDate,
} from './enrollment.utils';

@Injectable()
export class EnrollmentService {
  private enrollmentsCollectionRef: CollectionReference;
  private storage: Bucket;
  private logMemoryUsage: (label: string) => void;

  constructor(private readonly firebaseService: FirebaseService) {
    this.enrollmentsCollectionRef = this.firebaseService
      .getFirestore()
      .collection('enrollments');
    this.storage = this.firebaseService.getStorage();
    this.logMemoryUsage = this.firebaseService.getLogger();
  }

  async uploadFile(file: Express.Multer.File, fileLocation: string) {
    const fileRef = this.storage.file(fileLocation);

    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });
    await fileRef.makePublic();

    return `https://storage.googleapis.com/${this.storage.name}/${fileLocation}`;
  }

  async uploadStudentPictureAndDocument(
    enrollment: EnrollmentWithNoFiles,
    files: EnrollmentFiles,
  ) {
    const photo = files.studentPhoto?.[0];
    const pdf = files.documentsFile?.[0];

    const year = enrollment.enrollment.date.split('/')[2];
    const commonLocation = `${enrollment.personalStudentInfo.civilRegistrationNumber}/${year}`;

    let photoUrl = null;
    if (photo && typeof photo !== 'string') {
      const fileFormat = photo.originalname.split('.')[1];
      const photoLocation = `${commonLocation}_profile-picture.${fileFormat}`;
      photoUrl = await this.uploadFile(photo, photoLocation);
    }

    let pdfUrl = null;
    if (pdf && typeof pdf !== 'string') {
      const pdfLocation = `${commonLocation}_documents.pdf`;
      pdfUrl = await this.uploadFile(pdf, pdfLocation);
    }

    return { photoUrl, pdfUrl };
  }

  async postEnrollment(
    enrollment: EnrollmentWithNoFiles,
    files: EnrollmentFiles,
  ) {
    this.logMemoryUsage('Before start postEnrollment');
    const { photoUrl, pdfUrl } = await this.uploadStudentPictureAndDocument(
      enrollment,
      files,
    );

    const enrollmentWithCorrectTypes = {
      ...enrollment,
      enrollment: {
        ...enrollment.enrollment,
        withdrawalDate: normalizeWithdrawalDate(
          enrollment.enrollment.withdrawalDate,
        ),
      },
      mother: enrollment.mother
        ? { ...enrollment.mother, stratum: Number(enrollment.mother.stratum) }
        : null,
      father: enrollment.father
        ? { ...enrollment.father, stratum: Number(enrollment.father.stratum) }
        : null,
    };

    const docRef = await this.enrollmentsCollectionRef.add({
      ...enrollmentWithCorrectTypes,
      studentPhoto: photoUrl,
      documentsFile: pdfUrl,
    });
    this.logMemoryUsage('After postEnrollment');

    const docSnap = await docRef.get();

    return {
      id: docRef.id,
      ...docSnap.data(),
    };
  }

  async getEnrollments() {
    const enrollmentsSnap = await this.enrollmentsCollectionRef.get();

    const GRADE_ORDER = {
      walkers: 0,
      toddlers: 1,
      preschool: 2,
      kindergarten: 3,
      transition: 4,
      'first grade': 5,
    };

    const enrollments = enrollmentsSnap.docs.map((doc) => {
      const data = doc.data() as Enrollment & {
        documentsFile: string | null;
        studentPhoto: string | null;
      };

      return {
        ...data,
        enrollment: {
          ...data.enrollment,
          withdrawalDate: normalizeWithdrawalDate(
            data.enrollment?.withdrawalDate,
          ),
        },
        id: doc.id,
        state: getEnrollmentState(data),
      };
    }) as Array<
      Enrollment & {
        id: string;
        state: string;
      }
    >;

    const DEFAULT_GRADE_ORDER = 999;
    const enrollmentsSorted = enrollments.sort((a, b) => {
      const gradeA = a.enrollment?.entryGrade || '';
      const gradeB = b.enrollment?.entryGrade || '';
      return (
        (GRADE_ORDER[gradeA] || DEFAULT_GRADE_ORDER) -
        (GRADE_ORDER[gradeB] || DEFAULT_GRADE_ORDER)
      );
    });

    return enrollmentsSorted;
  }
  async completeEnrollment(id: string, files: EnrollmentFiles) {
    const enrollmentDoc = await this.enrollmentsCollectionRef.doc(id).get();
    const enrollmentData = enrollmentDoc.data() as EnrollmentWithNoFiles & {
      documentsFile: string | null;
      studentPhoto: string | null;
    };

    const { photoUrl, pdfUrl } = await this.uploadStudentPictureAndDocument(
      enrollmentData,
      files,
    );

    const documentAlreadyExists = !!enrollmentData.documentsFile;
    const studentPhotoAlreadyExists = !!enrollmentData.studentPhoto;

    const studentPhoto = studentPhotoAlreadyExists
      ? enrollmentData.studentPhoto
      : photoUrl;
    const documentsFile = documentAlreadyExists
      ? enrollmentData.documentsFile
      : pdfUrl;

    await this.enrollmentsCollectionRef.doc(id).update({
      studentPhoto,
      documentsFile,
    });

    return {
      id,
      ...enrollmentData,
      studentPhoto,
      documentsFile,
    };
  }

  async withdrawEnrollment(id: string, withdrawalDate: string) {
    const enrollmentRef = this.enrollmentsCollectionRef.doc(id);
    await enrollmentRef.update({ 'enrollment.withdrawalDate': withdrawalDate });
    const enrollmentDoc = await enrollmentRef.get();
    const enrollmentData = enrollmentDoc.data() as EnrollmentWithNoFiles & {
      documentsFile: string | null;
      studentPhoto: string | null;
    };
    const updatedEnrollment = {
      ...enrollmentData,
      enrollment: {
        ...enrollmentData.enrollment,
        withdrawalDate,
      },
    };

    return {
      ...updatedEnrollment,
      id,
      state: getEnrollmentState(updatedEnrollment),
    };
  }

  async deleteEnrollment(id: string) {
    await this.enrollmentsCollectionRef.doc(id).delete();
    return true;
  }
}
