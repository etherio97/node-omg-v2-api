import {
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  SERVICE_ACCOUNT,
} from '@/config';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount: admin.ServiceAccount = JSON.parse(
  readFileSync(SERVICE_ACCOUNT, 'utf-8')
);

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
});
