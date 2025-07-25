// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBE94QOH3vh9Hc527yjE_4MueKA3IkzCE",
  authDomain: "kokonda-s.firebaseapp.com",
  projectId: "kokonda-s",
  storageBucket: "kokonda-s.firebasestorage.app",
  messagingSenderId: "1003132659473",
  appId: "1:1003132659473:web:dea0b7c70e5987789c0eb0",
  measurementId: "G-17VW2ZEPMY"
};

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