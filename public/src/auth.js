// src/auth.js
import { auth } from "./firebase-config.js";
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

// Función para Iniciar Sesión con Google
export async function iniciarSesion() {
    try {
        const result = await signInWithPopup(auth, provider);
        // Aquí podrías guardar datos extra del usuario en Firestore si quisieras
        return result.user;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
}

// Función para Cerrar Sesión
export async function cerrarSesion() {
    try {
        await signOut(auth);
        console.log("Sesión cerrada");
        window.location.href = "index.html"; // Redirigir al login
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}

// Función para proteger rutas (verificar si hay usuario)
// Se usa en dashboard.html para que no entren sin permiso
export function observarEstado(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}