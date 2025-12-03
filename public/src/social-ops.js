// src/social-ops.js
import { db } from "./firebase-config.js";
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SEGUIR (Ahora recibe nombreChef)
export async function seguirUsuario(miId, idDelChef, nombreChef) {
    if (miId === idDelChef) return;
    const idRelacion = `${miId}_${idDelChef}`;
    await setDoc(doc(db, "follows", idRelacion), {
        followerId: miId,
        followedId: idDelChef,
        chefName: nombreChef || "Chef Anónimo" // Guardamos el nombre para la lista lateral
    });
}

// DEJAR DE SEGUIR
export async function dejarDeSeguir(miId, idDelChef) {
    const idRelacion = `${miId}_${idDelChef}`;
    await deleteDoc(doc(db, "follows", idRelacion));
}

// VERIFICAR SI SIGO A ALGUIEN
export async function estoySiguiendoA(miId, idDelChef) {
    const idRelacion = `${miId}_${idDelChef}`;
    const docRef = await getDoc(doc(db, "follows", idRelacion));
    return docRef.exists();
}

// OBTENER LISTA DE IDS (Para filtrar el feed)
export async function obtenerAQuienSigo(miId) {
    const lista = [];
    const q = query(collection(db, "follows"), where("followerId", "==", miId));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        lista.push(doc.data().followedId);
    });
    return lista;
}

// NUEVA: OBTENER LISTA DETALLADA (Para el Sidebar)
export async function obtenerSeguidosDetalle(miId) {
    const lista = [];
    const q = query(collection(db, "follows"), where("followerId", "==", miId));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const data = doc.data();
        lista.push({ id: data.followedId, nombre: data.chefName });
    });
    return lista;
}