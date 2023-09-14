const {
  createNewVideogame,
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  deleteVideogame,
  updateVideogame,
} = require("../controllers/videogamesControllers");

//* ********************************************************************************************************** *//
//Handler para traer videojuegos por query (?name=)
const getVideogamesByNameHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const responseWithName = (await getVideogamesByName(name))
        .filter((videogame) =>
          videogame.name.toLowerCase().includes(name.toLowerCase())
        )
        .slice(0, 15);
      res.status(200).json(responseWithName);
    } else {
      const responseWithoutName = await getAllVideogames();
      res.status(200).json(responseWithoutName);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* ********************************************************************************************************** *//
//Handler para traer todos los videojuegos y manejar errores
const getVideogamesByIdHandler = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    if (idVideogame) {
      const getVideogameId = await getVideogameById(idVideogame);
      return res.status(200).json(getVideogameId);
    } else {
      return res.status(400).send("The ID wasn't found");
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//* ********************************************************************************************************** *//
//Handler para crear un nuevo videojuego y manejar errores
const createVideogamesHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;
    if (
      !name ||
      !description ||
      !platforms ||
      !background_image ||
      !released ||
      !rating
    ) {
      res.status(404).send("The information is not complete");
    } else {
      const videogameCreated = await createNewVideogame(
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres
      );
      return res.status(201).json(videogameCreated);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//* **********************************************************************************************************//
//Handler para borrar un videojuego por id y manejar errores
const deleteVideogameByIdHandler = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const deletedVideogame = await deleteVideogame(idVideogame);
    return res.status(200).json(deletedVideogame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* **********************************************************************************************************//
const updateVideogameByIdHandler = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;
    const updatedVideogame = await updateVideogame(
      idVideogame,
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    );
    return res.status(200).json(updatedVideogame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVideogamesByNameHandler,
  getVideogamesByIdHandler,
  createVideogamesHandler,
  deleteVideogameByIdHandler,
  updateVideogameByIdHandler,
};
