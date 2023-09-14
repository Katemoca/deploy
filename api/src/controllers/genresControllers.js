const axios = require("axios");
const { Genre } = require("../db");

require("dotenv").config();
const { API_KEY } = process.env;

// ********************************************************************************************************** //
// Controller para traer todos los géneros de la API => findOrCreate => 19 géneros
const getAllGenresVideogames = async () => {
  const URL_API = `https://api.rawg.io/api/genres?key=${API_KEY}`;

  const genresDb = await Genre.findAll();
  if (!genresDb.length) {
    const requestApi = (await axios.get(`${URL_API}`)).data.results;
    const genresArray = requestApi.map((genre) => genre.name);

    await Promise.all(
      genresArray.map(async (genre) => {
        await Genre.findOrCreate({
          where: {
            name: genre,
          },
        });
      })
    );

    return genresArray;
  }
  return genresDb.map((g) => g.name);
};

module.exports = {
  getAllGenresVideogames,
};

//*********************************************************************************************************** //

// const getAllGenresVideogames = async () => {
//   const URL_BASE = `https://api.rawg.io/api/genres?key=${API_KEY}`;

//   const apiGenres = (await axios.get(URL_BASE)).data;
//   const videogamesGenres = apiGenres.results.map((gen) => gen.name);

//   videogamesGenres.flat().forEach(async (element) => {
//     await Genre.findOrCreate({ where: { name: element } });
//   });

//   const allVideogamesGenres = await Genre.findAll();
//   return allVideogamesGenres;
// };

// module.exports = {
//   getAllGenresVideogames,
// };
