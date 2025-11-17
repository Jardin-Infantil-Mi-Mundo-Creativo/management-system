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

  constructor(private readonly firebaseService: FirebaseService) {
    this.enrollmentsCollectionRef = this.firebaseService
      .getFirestore()
      .collection('enrollments');
    this.storage = this.firebaseService.getStorage();
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
    const { photoUrl, pdfUrl } = await this.uploadStudentPictureAndDocument(
      enrollment,
      files,
    );

    const docRef = await this.enrollmentsCollectionRef.add({
      ...enrollment,
      studentPhotoUrl: photoUrl,
      documentsFileUrl: pdfUrl,
    });

    const docSnap = await docRef.get();

    return {
      id: docRef.id,
      ...docSnap.data(),
    };
  }
}
