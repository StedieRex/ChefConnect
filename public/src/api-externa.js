// src/api-externa.js

export async function obtenerIdeaAleatoria() {
    try {
        // Hacemos la petición a la API pública
        const respuesta = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const datos = await respuesta.json();
        
        // La API devuelve un array "meals" con un solo objeto
        const comida = datos.meals[0];

        return {
            titulo: comida.strMeal,
            instrucciones: "Ver receta completa en la web...", // Simplificado
            imagen: comida.strMealThumb,
            categoria: comida.strCategory,
            area: comida.strArea
        };
    } catch (error) {
        console.error("Error al consultar API externa:", error);
        return null;
    }
}