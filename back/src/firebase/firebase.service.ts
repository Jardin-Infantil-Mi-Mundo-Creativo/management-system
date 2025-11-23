import { Injectable, Logger } from '@nestjs/common';
import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private app: App;
  private firestore: FirebaseFirestore.Firestore;
  private storage: Bucket;
  private logMemoryUsage(label: string) {
    const usage = process.memoryUsage();
    this.logger.log(
      `[${label}] Memory: ` +
        `Heap ${(usage.heapUsed / 1024 / 1024).toFixed(2)}MB / ` +
        `${(usage.heapTotal / 1024 / 1024).toFixed(2)}MB | ` +
        `RSS ${(usage.rss / 1024 / 1024).toFixed(2)}MB | ` +
        `External ${(usage.external / 1024 / 1024).toFixed(2)}MB`,
    );
  }

  constructor() {
    const environment = process.env.NODE_ENV || 'production';
    this.logger.log(`Initializing Firebase app in ${environment} environment`);
    this.logMemoryUsage('Before Firebase Init');

    if (getApps().length === 0) {
      this.app =
        environment === 'development'
          ? initializeApp({
              credential: cert({
                type: process.env.BACK_FIREBASE_TYPE,
                project_id: process.env.BACK_FIREBASE_PROJECT_ID,
                private_key_id: process.env.BACK_FIREBASE_PRIVATE_KEY_ID,
                private_key: process.env.BACK_FIREBASE_PRIVATE_KEY,
                client_email: process.env.BACK_FIREBASE_CLIENT_EMAIL,
                client_id: process.env.BACK_FIREBASE_CLIENT_ID,
                auth_uri: process.env.BACK_FIREBASE_AUTH_URI,
                token_uri: process.env.BACK_FIREBASE_TOKEN_URI,
                auth_provider_x509_cert_url:
                  process.env.BACK_FIREBASE_AUTH_PROVIDER_CERT_URL,
                client_x509_cert_url: process.env.BACK_FIREBASE_CLIENT_CERT_URL,
                universe_domain: process.env.BACK_FIREBASE_UNIVERSE_DOMAIN,
              } as ServiceAccount),
            })
          : initializeApp({
              projectId: process.env.BACK_FIREBASE_PROJECT_ID,
            });
      this.logger.log('Firebase app initialized');
      this.logMemoryUsage('After Firebase Init with from scratch');
    } else {
      this.app = getApps()[0];
      this.logger.log('Using existing Firebase app');
      this.logMemoryUsage('After Firebase Init with existing app');
    }

    this.firestore = getFirestore(this.app);
    this.logMemoryUsage('After Firestore Init');
    this.storage = getStorage(this.app).bucket(
      'mi-mundo-creativo-7982f.firebasestorage.app',
    );
    this.logMemoryUsage('After Storage Init');
  }

  getFirestore(): FirebaseFirestore.Firestore {
    return this.firestore;
  }

  getStorage(): Bucket {
    return this.storage;
  }

  getLogger(): (label: string) => void {
    return this.logMemoryUsage.bind(this);
  }
}
