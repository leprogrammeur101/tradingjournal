// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ces informations se trouvent dans les paramètres de ton projet sur la console Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialiser l'application Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services pour les utiliser dans tes autres fichiers
export const auth = getAuth(app);      // Pour l'authentification
export const db = getFirestore(app);    // Pour la base de données Firestore
export default app;