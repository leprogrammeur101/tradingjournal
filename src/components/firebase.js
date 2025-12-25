// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ces informations se trouvent dans les paramètres de ton projet sur la console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6WJUqp1EVpvcNL-M0KbhzyKEHh8js1gE",
  authDomain: "mytradingjournal-84a67.firebaseapp.com",
  projectId: "mytradingjournal-84a67",
  storageBucket: "mytradingjournal-84a67.firebasestorage.app",
  messagingSenderId: "285408502416",
  appId: "1:285408502416:web:0fed0eec92d8fa2496ee15"
};

// Initialiser l'application Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services pour les utiliser dans tes autres fichiers
export const auth = getAuth(app);      // Pour l'authentification
export const db = getFirestore(app);    // Pour la base de données Firestore
export default app;