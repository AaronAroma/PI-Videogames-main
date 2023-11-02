const { Videogames, Genres } = require("../../db.js");

const postVideogame = async (game) => {
    const {
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres
    } = game;

    // Formatear la fecha de lanzamiento en formato ISO (YYYY-MM-DD)
    const releaseDate = new Date(released).toISOString();

    try {
        // Crear el videojuego en la base de datos o encontrarlo si ya existe por el nombre
        const [videogame, created] = await Videogames.findOrCreate({
            where: { name },
            defaults: {
                name,
                description,
                platforms,
                background_image,
                released: releaseDate,
                rating,
            },
        });

        // Asociar los géneros al videojuego
        if (genres && genres.length > 0) {
            const genresFound  = await findGenresByName(genres);
            await videogame.setGenres(genresFound);
        }

        return videogame;
    } catch (error) {
        console.error(error);
        throw new Error("Ocurrió un error al crear el videojuego");
    }
};

// Función para buscar géneros por nombre
const findGenresByName = async (genreNames) => {
    const genres = await Genres.findAll({ where: { name: genreNames } });
    return genres;
};

module.exports = postVideogame