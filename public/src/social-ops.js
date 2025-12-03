// src/social-ops.js
import { db } from "./firebase-config.js";
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SEGUIR a un usuario
export async function seguirUsuario(miId, idDelChef) {
    if (miId === idDelChef) return; // No te puedes seguir a ti mismo
    // Creamos un ID único combinando ambos (ej. "usuarioA_usuarioB")
    const idRelacion = `${miId}_${idDelChef}`;
    await setDoc(doc(db, "follows", idRelacion), {
        followerId: miId,
        followedId: idDelChef
    });
}

// DEJAR DE SEGUIR
export async function dejarDeSeguir(miId, idDelChef) {
    const idRelacion = `${miId}_${idDelChef}`;
    await deleteDoc(doc(db, "follows", idRelacion));
}

// VERIFICAR si ya lo sigo (para pintar el botón correcto)
export async function estoySiguiendoA(miId, idDelChef) {
    const idRelacion = `${miId}_${idDelChef}`;
    const docRef = await getDoc(doc(db, "follows", idRelacion));
    return docRef.exists();
}

// OBTENER LISTA de gente que sigo (para el filtro de Chefs Favoritos)
export async function obtenerAQuienSigo(miId) {
    const lista = [];
    const q = query(collection(db, "follows"), where("followerId", "==", miId));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        lista.push(doc.data().followedId);
    });
    return lista; // Devuelve array de IDs ej: ["user1", "user5"]
}