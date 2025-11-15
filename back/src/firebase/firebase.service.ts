import { Injectable } from '@nestjs/common';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { Bucket } from '@google-cloud/storage'; // Ya funciona gracias a la instalación

@Injectable()
export class FirebaseService {
  private firestore: FirebaseFirestore.Firestore;
  private storage: Bucket;

  constructor() {
    initializeApp({
      credential: cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
    this.firestore = getFirestore();
    this.storage = getStorage().bucket(
      'mi-mundo-creativo-7982f.firebasestorage.app',
    );
  }

  getFirestore(): FirebaseFirestore.Firestore {
    return this.firestore;
  }

  getStorage(): Bucket {
    return this.storage;
  }
}
