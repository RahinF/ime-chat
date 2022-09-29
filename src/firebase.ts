import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ime-chat-45658.firebaseapp.com",
  projectId: "ime-chat-45658",
  storageBucket: "ime-chat-45658.appspot.com",
  messagingSenderId: "663582528661",
  appId: "1:663582528661:web:8ae015ffad64c55f95f79c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
