// src/firebase-config.js

// Usamos las URL completas para que funcione directo en el navegador
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtgSSgOekDIbXx-6Jerz8FJ4kynpSBNQU",
  authDomain: "edumanager-39344.firebaseapp.com",
  projectId: "edumanager-39344",
  storageBucket: "edumanager-39344.firebasestorage.app",
  messagingSenderId: "62656086554",
  appId: "1:62656086554:web:ae0a51dccabb2b56e287a3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios y exportarlos
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };