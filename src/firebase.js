// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDBE94QOH3vh9Hc527yjE_4MueKA3IkzCE",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "kokonda-s.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "kokonda-s",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "kokonda-s.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1003132659473",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1003132659473:web:dea0b7c70e5987789c0eb0",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-17VW2ZEPMY"
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration error: Missing required environment variables');
  console.error('Please check your .env file or deployment environment variables');
  console.error('Required variables: REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_PROJECT_ID');
  
  // Show a user-friendly error in the UI
  const errorMessage = document.createElement('div');
  errorMessage.style.color = 'red';
  errorMessage.style.padding = '20px';
  errorMessage.style.fontFamily = 'Arial, sans-serif';
  errorMessage.innerHTML = `
    <h2>Configuration Error</h2>
    <p>Firebase configuration is missing. Please check the following:</p>
    <ul>
      <li>Is the .env file present in the frontend directory?</li>
      <li>Are all required environment variables set?</li>
      <li>Have you restarted the development server after adding environment variables?</li>
    </ul>
  `;
  document.body.prepend(errorMessage);
  
  throw new Error('Missing required Firebase configuration');
}

// Verify required config values are present
const requiredConfig = ['projectId', 'apiKey', 'authDomain'];
const missingConfig = requiredConfig.filter(key => !firebaseConfig[key]);

if (missingConfig.length > 0) {
  console.error('Missing required Firebase config values:', missingConfig);
  throw new Error(`Firebase configuration error: Missing ${missingConfig.join(', ')}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Firestore collection references
export const patientsCollection = collection(db, "patients");
export const appointmentsCollection = collection(db, "appointments");
export const billsCollection = collection(db, "bills");
export const usersCollection = collection(db, "users");
export const campsCollection = collection(db, "camps");

// Simple hash function for staff passwords (not secure, for demo only)
export function simpleHash(str) {
  let hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

export const signOutAdmin = () => signOut(auth);