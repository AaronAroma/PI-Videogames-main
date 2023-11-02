require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../../db.js");
const { DB_APIKEY } = process.env;

// Función para buscar videojuegos por su id
const getVideogameByID = async (idVideogame) => {
    try {
        // Verifica si el ID es de la base de datos o de la API
        if (idVideogame.length > 8) {
            // Busca el videojuego en la base de datos
            const gameFromDb = await findVideogameInDatabase(idVideogame);
            if (gameFromDb) {
                return gameFromDb;
            }
        }

        // Busca el videojuego en la API
        const gameFromApi = await findVideogameInApi(idVideogame);

        if (gameFromApi) {
            return gameFromApi;
        } else {
            throw new Error("ID de juego no encontrado");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Ocurrió un error al buscar el videojuego por ID");
    }
};

// Función que busca un videojuego en la base de datos
const findVideogameInDatabase = async (id) => {
    return await Videogame.findByPk(id, {
        include: [{ model: Genre, attributes: ["name"] }],
    });
};

// Función que busca un videojuego en la API externa
const findVideogameInApi = async (id) => {
    try {
        const response = await axios.get(
            `https://api.rawg.io/api/games/${id}?key=${DB_APIKEY}`
        );
        return response.data; // Devuelve los datos del juego desde la API
    } catch (error) {
        return null; // Si no se encuentra el juego en la API, devolvemos null
    }
};

module.exports = getVideogameByID;
