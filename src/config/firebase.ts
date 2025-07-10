import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_TEST_KEY",
  authDomain: "mental-coaching-app.firebaseapp.com",
  projectId: "mental-coaching-app",
  storageBucket: "mental-coaching-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Ajout des identifiants de test
export const testCredentials = {
  email: "test@example.com",
  password: "password123"
};