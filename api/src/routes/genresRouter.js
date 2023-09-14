const { Router } = require("express");
const { getGenresVideogamesHandler } = require("../handlers/genresHandlers");

const genresRouter = Router();

genresRouter.get("/", getGenresVideogamesHandler);

module.exports = genresRouter;
