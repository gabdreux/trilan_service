import admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();


const serviceAccount = path.join(__dirname, 'config', 'firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
