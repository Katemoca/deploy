const { Router } = require("express");
// Importar todos los routers;
const videogamesRouter = require("./videogamesRouter");
const genresRouter = require("./genresRouter");

const mainRouter = Router();

// Configurar los routers
mainRouter.use("/videogames", videogamesRouter);
mainRouter.use("/genres", genresRouter);

module.exports = mainRouter;
