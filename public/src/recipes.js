// src/recipes.js
import { db } from "./firebase-config.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    deleteDoc, 
    doc,
    orderBy // Para ordenar por fecha
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const COLLECTION_NAME = "recipes";

// CREAR: Guardar una nueva receta
export async function crearReceta(datosReceta) {
    try {
        // Añadimos fecha de creación para ordenar después
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...datosReceta,
            fechaCreacion: new Date()
        });
        console.log("Receta guardada con ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error al guardar receta: ", e);
        throw e;
    }
}

// LEER: Obtener solo las recetas del usuario logueado
export async function obtenerMisRecetas(userId) {
    const recetas = [];
    try {
        // Query: Dame las recetas donde user_id sea igual al ID del usuario actual
        const q = query(
            collection(db, COLLECTION_NAME), 
            where("user_id", "==", userId)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            recetas.push({ id: doc.id, ...doc.data() });
        });
        return recetas;
    } catch (e) {
        console.error("Error al obtener recetas: ", e);
        return [];
    }
}

// BORRAR: Eliminar una receta por su ID
export async function eliminarReceta(idReceta) {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, idReceta));
    } catch (e) {
        console.error("Error al eliminar: ", e);
        throw e;
    }
}

// src/recipes.js (Agrega esto al final)

// LEER: Obtener TODAS las recetas públicas (Muro Social)
export async function obtenerRecetasPublicas() {
    const recetas = [];
    try {
        const q = query(
            collection(db, COLLECTION_NAME), 
            where("es_publica", "==", true),
            orderBy("fechaCreacion", "desc") // Las más nuevas primero
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            recetas.push({ id: doc.id, ...doc.data() });
        });
        return recetas;
    } catch (e) {
        console.error("Error al obtener muro social: ", e);
        // Si falta el índice compuesto en Firebase, esto podría fallar al principio
        // Revisa la consola del navegador, Firebase te dará un link para crearlo automáticamente.
        return [];
    }
}