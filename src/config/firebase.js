import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkW7loDkn0lFSYB5b8ZO5Ea6iwJKzsYZE",
  authDomain: "fir-1-531c4.firebaseapp.com",
  projectId: "fir-1-531c4",
  storageBucket: "fir-1-531c4.appspot.com",
  messagingSenderId: "222711274913",
  appId: "1:222711274913:web:7af86b498ddb261bfd3fe0",
  measurementId: "G-G2B24TJD8E"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);