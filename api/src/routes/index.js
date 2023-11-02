const { Router } = require("express");
const getVideogames = require("../controllers/videogames/getVideogames.js");
const getVideogamesByID = require("../controllers/videogames/getVideogamesByID.js");
const getVideogamesByName = require("../controllers/videogames/getVideogamesByName.js");
const postVideogames = require("../controllers/videogames/postVideogames.js");
const getGenres = require("../controllers/genres/getGenres.js")

const router = Router();

// Ruta para obtener todos los videojuegos
router.get("/videogames", async (req, res) => {
    try {
        const videogames = await getVideogames();
        res.status(200).json(videogames);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor: " + error.message);
    }
});

// Ruta para crear un nuevo videojuego
router.post('/videogames', async (req, res) => {
    const { name, description, platforms, genres, background_image, released, rating } = req.body;
    const game = { name, description, platforms, genres, background_image, released, rating };
    try {
        const newGame = await postVideogames(game);
        res.status(201).json(newGame);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor: " + error.message);
    }
});

// Ruta para obtener un videojuego por su ID
router.get("/videogames/:idVideogame", async (req, res) => {
    const { idVideogame } = req.params;
    try {
        const game = await getVideogamesByID(idVideogame);
        if (!game) {
            res.status(404).send("No se encontró un videojuego con ese ID.");
        } else {
            res.status(200).send(game);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor: " + error.message);
    }
});

// Ruta para buscar videojuegos por nombre
router.get("/videogames/name", async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            res.status(400).send("El parámetro 'name' es requerido.");
        } else {
            const videogames = await getVideogamesByName(name);
            if (videogames.length === 0) {
                res.status(404).json({
                    error: "No se encontraron videojuegos con ese nombre.",
                });
            } else {
                res.status(200).json(videogames);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor: " + error.message);
    }
});

//Ruta para buscar generos
router.get("/genres", async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error al buscar géneros:", error);
        res.status(500).json({ error: "Ocurrió un error al buscar los géneros." });
    }
});


module.exports = router;

