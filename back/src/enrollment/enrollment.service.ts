/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, CollectionReference } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import type {
  EnrollmentWithNoFiles,
  EnrollmentFiles,
} from './enrollment.entity';

@Injectable()
export class EnrollmentService {
  private collectionRef: CollectionReference;

  constructor() {
    initializeApp({
      credential: cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      } as ServiceAccount),
    });
    const db = getFirestore();
    this.collectionRef = db.collection('enrollments');
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    if (!file) return null;

    const storage = getStorage().bucket(
      'mi-mundo-creativo-7982f.firebasestorage.app',
    );

    const filename = `${folder}${Date.now()}-${file.originalname}`;
    const fileRef = storage.file(filename);

    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    // hacer archivo publico
    await fileRef.makePublic();

    return `https://storage.googleapis.com/${storage.name}/${filename}`;
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
    const docRef = await this.collectionRef.add({
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
