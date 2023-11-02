require('dotenv').config();
const { DB_APIKEY } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../../db");
const axios = require("axios");

// Función para buscar videojuegos por nombre:
const getVideogamesByName = async (name) => {
    try {
      // Convertimos el nombre de búsqueda a minúsculas
      const nameLowerCase = name.toLowerCase();
  
      // Búsqueda en la base de datos local
      const databaseResults = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${nameLowerCase}%`, // Búsqueda insensible a mayúsculas/minúsculas
          },
        },
        include: [
          {
            model: Genre,
            attributes: ["name"], // Incluir solo el nombre del género en los resultados
          },
        ],
      });
  
      // Búsqueda en la API externa
      const apiResults = await searchInExternalAPI(nameLowerCase);
  
      // Combinar y limitar los resultados
      const combinedResults = combineAndLimitResults(databaseResults, apiResults);
  
      console.log(combinedResults);
      return combinedResults;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Función para buscar en la API externa
  const searchInExternalAPI = async (name) => {
    try {
      const { data } = await axios.get(`https://api.rawg.io/api/games?key=${DB_APIKEY}&search=${name}&page_size=15`);
      
      return data.results;
    } catch (error) {
      throw new Error("Error al buscar en la API externa");
    }
  };
  
  // Función para combinar y limitar resultados
  const combineAndLimitResults = (databaseResults, apiResults) => {
    // Combinar los resultados de la base de datos y la API
    const combinedResults = [...databaseResults, ...apiResults];
  
    // Limitar a 15 resultados
    const limitedResults = combinedResults.slice(0, 15);
  
    return limitedResults;
  };

  module.exports = getVideogamesByName