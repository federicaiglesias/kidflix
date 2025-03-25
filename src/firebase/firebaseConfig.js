import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "kidflix-9aa45.firebaseapp.com",
  projectId: "kidflix-9aa45",
  storageBucket: "kidflix-9aa45.firebasestorage.app",
  messagingSenderId: "954802525218",
  appId: "1:954802525218:web:2dace7f31337d9dc34667b",
  measurementId: "G-ZERRK11B44",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
