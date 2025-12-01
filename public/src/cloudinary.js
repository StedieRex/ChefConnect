// src/cloudinary.js

const CLOUD_NAME = "diolfdye1"; // Tu nombre de usuario en Cloudinary
const UPLOAD_PRESET = "red_social_preset"; // El nombre del preset (ej. 'recetario_imgs')

// Función reutilizable para subir imágenes
export async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Error al subir imagen");

        const data = await response.json();
        return data.secure_url; // Retornamos la URL pública de la imagen
    } catch (error) {
        console.error("Error en Cloudinary:", error);
        return null;
    }
}