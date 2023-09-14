const { getAllGenresVideogames } = require("../controllers/genresControllers");

// Handler para traer todos los géneros desde la API
const getGenresVideogamesHandler = async (req, res) => {
  try {
    const response = await getAllGenresVideogames();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGenresVideogamesHandler,
};
