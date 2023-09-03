// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCv_Q9QN5sMnQNs3gTrlVlB0SHjY1UhXBo",
  authDomain: "annular-fold-364614.firebaseapp.com",
  projectId: "annular-fold-364614",
  storageBucket: "annular-fold-364614.appspot.com",
  messagingSenderId: "650446281993",
  appId: "1:650446281993:web:27ad2319e000588ac8ac7d8",
  measurementId: "G-P3R7SKD91G",
  maxAgeSeconds: 3600,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
export default app;