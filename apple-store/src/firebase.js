
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjQaAjYE5JjZ37Fn39aW4qEjZrX8wV5wQ",
  authDomain: "store-262e5.firebaseapp.com",
  projectId: "store-262e5",
  storageBucket: "store-262e5.firebasestorage.app",
  messagingSenderId: "294453186538",
  appId: "1:294453186538:web:4d94a1d249473c6e9bac93",
  measurementId: "G-THFMLDZ8FX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
