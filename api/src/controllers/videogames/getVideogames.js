require('dotenv').config();
const axios = require("axios");
const { Videogame, Genre } = require("../../db.js")
const { DB_APIKEY } = process.env;

const getVideogames = async () => {
    try {
        const videogames = await Videogame.findAll({
            include: { model: Genre },
        });

        const res = await axios.get(
            `https://api.rawg.io/api/games?key=${DB_APIKEY}&page=1&page_size=40`
        );

        const gamesapi = res.data.results;
        return [...videogames, ...gamesapi];
    }
    catch (error) {
        throw new Error(error.message);
    };
}

module.exports = getVideogames