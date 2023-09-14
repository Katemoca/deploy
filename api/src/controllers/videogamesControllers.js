const { Videogame, Genre } = require("../db");
const axios = require("axios");
//Traemos la API_KEY
require("dotenv").config();
const { API_KEY } = process.env;
const { cleanData } = require("../utils/cleanData");

//*********************************************************************************************************** //
//Controller para obtener los videojuegos de la DB => Videogame.findAll()
const getVideogamesDb = async () => {
  const videogamesDB = await Videogame.findAll({
    include: {
      model: Genre,
      as: "genres",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  // Igualamos la estructura de la base de datos con the api
  const structuredInfo = videogamesDB.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      platforms: videogame.platforms?.map((platform) => platform) || [],
      background_image: videogame.background_image,
      released: videogame.released,
      rating: videogame.rating,
      genres: videogame.genres?.map((genre) => genre.name) || [],
      createdVideoGame: true,
    };
  });

  return structuredInfo;
};

//*********************************************************************************************************** //
//Controller para obtener los videojuegos de la api
const getVideogamesApi = async () => {
  let games = [];
  let URL_API = `https://api.rawg.io/api/games?key=${API_KEY}`;

  for (let i = 0; i < 5; i++) {
    let page = await axios.get(URL_API);
    games = games.concat(
      cleanData(page.data?.results).map((game) => ({
        ...game,
        createdVideoGame: false,
      }))
    );
    URL_API = page.data.next;
  }
  return games;
};

//Juntamos los videojuegos de la api con los de la base de datos
const getAllVideogames = async () => {
  // Buscamos en la BD
  let videogamesDb = await getVideogamesDb();
  // Buscamos en la API
  let videogamesApi = await getVideogamesApi();
  let AllVideogames = [...videogamesDb, ...videogamesApi];

  if (AllVideogames.length === 0) {
    throw new Error("There aren't any videogames");
  }
  return AllVideogames;
};

//*********************************************************************************************************** //
//Controller para traer videojuegos por nombre
const getVideogamesByName = async (name) => {
  let URL_API_SEARCH = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`; //Endpoint con search
  const videogamesApi = (await axios.get(`${URL_API_SEARCH}`)).data.results;
  const videogamesDb = await getVideogamesDb();
  const cleanedApiData = cleanData(videogamesApi);

  const allVideogames = [...cleanedApiData, ...videogamesDb];
  if (name) {
    const filterVideogames = allVideogames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    if (!filterVideogames.length) {
      throw new Error("This name didn't match any videogame");
    }
    return filterVideogames;
  }

  return allVideogames.slice(0, 15);
};

//*********************************************************************************************************** //
//Controller para traer a un videojuego por id
const getVideogameById = async (idVideogame) => {
  const URL_API_ID = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;

  if (isNaN(idVideogame)) {
    const videogamesDb = await getVideogamesDb();
    const videogameFindUuid = videogamesDb.find(
      (game) => game.id === idVideogame
    );
    return videogameFindUuid || "Id wasn't found";
  }
  const apiRequestId = (await axios.get(`${URL_API_ID}`)).data;

  apiRequestIdFiltered = {
    id: apiRequestId.id,
    name: apiRequestId.name,
    description: apiRequestId.description,
    platforms: apiRequestId.platforms?.map(
      (platform) => platform.platform.name
    ),
    background_image: apiRequestId.background_image,
    released: apiRequestId.released,
    rating: apiRequestId.rating,
    genres: apiRequestId.genres?.map((genre) => genre.name),
    createdVideoGame: apiRequestId.createdVideoGame,
  };

  return apiRequestIdFiltered || "Id wasn't found";
};

//*********************************************************************************************************** //
//Controller para crear un nuevo videojuego con sus géneros (plataformas y géneros son arrays de objetos en la API toca traerlos desde la API)
const createNewVideogame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  const [newVideogame, created] = await Videogame.findOrCreate({
    where: { name: name },
    defaults: {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      createdVideoGame: true,
    },
  });

  genres.forEach(async (genreFound) => {
    let genresToAdd = await Genre.findAll({ where: { name: genreFound } });
    await newVideogame.addGenres(genresToAdd);
  });

  if (created) {
    return newVideogame;
  } else {
    throw Error("The videogame already exists");
  }
};

//*********************************************************************************************************** //
//Controller para eliminar un videojuego por id
const deleteVideogame = async (idVideogame) => {
  const getVideogame = await Videogame.findByPk(idVideogame);
  if (getVideogame) {
    getVideogame.destroy();
    return "The videogame was deleted";
  } else {
    throw Error("Videogame not found");
  }
};

//*********************************************************************************************************** //
//Controller para actualizar un videojuego creado
const updateVideogame = async (
  idVideogame,
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  const videogameToUpdate = await Videogame.findByPk(idVideogame);

  if (!videogameToUpdate) {
    throw Error("Videogame not found");
  }

  videogameToUpdate.name = name;
  videogameToUpdate.description = description;
  videogameToUpdate.platforms = platforms;
  videogameToUpdate.background_image = background_image;
  videogameToUpdate.released = released;
  videogameToUpdate.rating = rating;

  await videogameToUpdate.save();

  const genresToAdd = await Genre.findAll({
    where: {
      name: genres,
    },
  });

  if (!genresToAdd || genresToAdd.length === 0) {
    throw Error("No genres were found");
  }

  const successMessage = `videogame was updated`;

  return successMessage;
};

module.exports = {
  createNewVideogame,
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  deleteVideogame,
  updateVideogame,
};
