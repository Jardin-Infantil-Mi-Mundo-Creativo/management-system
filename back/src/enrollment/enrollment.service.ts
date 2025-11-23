import { Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import type {
  EnrollmentWithNoFiles,
  EnrollmentFiles,
} from './enrollment.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { Bucket } from '@google-cloud/storage';

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

    const fileFormat = photo.originalname.split('.')[1];
    const photoLocation = `${commonLocation}_profile-picture.${fileFormat}`;
    const photoUrl = await this.uploadFile(photo, photoLocation);

    const pdfLocation = `${commonLocation}_documents.pdf`;
    const pdfUrl = await this.uploadFile(pdf, pdfLocation);

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

    const docRef = await this.enrollmentsCollectionRef.add({
      ...enrollment,
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
    return enrollmentsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
