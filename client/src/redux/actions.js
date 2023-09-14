import axios from "axios";
import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  DELETE_DETAIL_VIDEOGAME,
  RESET_DETAIL_TO_HOME,
  GET_ALL_GENRES,
  SEARCH_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_ORDER,
  FILTER_BY_RATING,
  FILTER_BY_ORIGIN,
} from "./actionTypes.js";

//Action para traer todos los videojuegos
export const getAllVideogames = () => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    try {
      const response = await axios.get(`${URL}`);
      dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Action para traer videojuego por ID
export const getVideogameByDetail = (id) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    try {
      const response = await axios.get(`${URL}/${id}`);

      dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Action para eliminar el detail del videojuego CREADO
export const deleteDetailVideogame = (detailId) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    try {
      await axios.delete(`${URL}/${detailId}`);
      dispatch({ type: DELETE_DETAIL_VIDEOGAME, payload: detailId });
    } catch (error) {
      console.log(error);
    }
  };
};

//Action para resetear estado del detail al ir para home
export const resetDetailToHome = () => {
  return function (dispatch) {
    dispatch({
      type: RESET_DETAIL_TO_HOME,
    });
  };
};

//Action para crear un nuevo videojuego
export const postVideogame = (form) => {
  // eslint-disable-next-line no-unused-vars
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    try {
      await axios.post(`${URL}`, form);
      alert("The videogame was created 😉");
    } catch (error) {
      console.log(error.response.data.error);
      alert("The videogame wasn't created 🙈");
    }
  };
};

//Action para buscar por nombre => searchBar.jsx
export const searchByName = (name) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    try {
      const response = await axios.get(`${URL}?name=${name}`);
      dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data.slice(0, 15),
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

//Action para traer todos los géneros
export const getAllGenres = () => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/genres";
    try {
      const response = await axios.get(`${URL}`);
      dispatch({
        type: GET_ALL_GENRES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//*************************************************************************************************************************************/
//FILTROS Y ORDENAMIENTO "GLOBALES"

export const filterByGenre = (payload) => {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export const filterByOrder = (payload) => {
  return {
    type: FILTER_BY_ORDER,
    payload,
  };
};

export const filterByRating = (payload) => {
  return {
    type: FILTER_BY_RATING,
    payload,
  };
};
