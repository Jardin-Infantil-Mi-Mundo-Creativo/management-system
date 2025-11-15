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

  async uploadFile(file: Express.Multer.File, folder: string) {
    if (!file) return null;

    const filename = `${folder}${Date.now()}-${file.originalname}`;
    const fileRef = this.storage.file(filename);

    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });
    await fileRef.makePublic();

    return `https://storage.googleapis.com/${this.storage.name}/${filename}`;
  }

  async postEnrollment(
    enrollment: EnrollmentWithNoFiles,
    files: EnrollmentFiles,
  ) {
    const photo = files.studentPhoto?.[0];
    const pdf = files.documentsFile?.[0];

    // Aquí subes los archivos a cloud storage
    const photoUrl = await this.uploadFile(photo, 'photos/');
    const pdfUrl = await this.uploadFile(pdf, 'documents/');

    // agregar URLs a Firestore
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
