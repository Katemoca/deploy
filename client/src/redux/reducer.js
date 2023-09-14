/* eslint-disable no-case-declarations */
import {
  DELETE_DETAIL_VIDEOGAME,
  GET_ALL_GENRES,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  RESET_DETAIL_TO_HOME,
  SEARCH_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  FILTER_BY_ORDER,
  FILTER_BY_RATING,
} from "./actionTypes";

let initialState = {
  videogames: [],
  copyGames: [],
  videogameDetail: [],
  genres: [],
  copygenres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        copyGames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };

    case DELETE_DETAIL_VIDEOGAME:
      return {
        ...state,
        videogameDetail: action.payload,
      };

    case RESET_DETAIL_TO_HOME:
      return {
        ...state,
        videogameDetail: [],
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
        copyGenres: action.payload,
      };

    case FILTER_BY_GENRE:
      const filteredGenre = state.copyGames.filter((game) =>
        game.genres?.includes(action.payload)
      );

      return {
        ...state,
        videogames: filteredGenre,
      };

    case FILTER_BY_ORIGIN:
      const apiVideogame = state.copyGames.filter(
        (vg) => vg.createdVideoGame !== true
      );
      const dbVideogame = state.copyGames.filter(
        (vg) => vg.createdVideoGame === true
      );

      const filteredVideogames =
        action.payload === "api"
          ? apiVideogame
          : action.payload === "db"
          ? dbVideogame
          : state.copyGames;

      return {
        ...state,
        videogames: filteredVideogames,
      };

    case FILTER_BY_ORDER:
      let copyVideogames = [...state.videogames];
      let orderedGames =
        action.payload === "a-z"
          ? copyVideogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : copyVideogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogames: orderedGames,
      };

    case FILTER_BY_RATING:
      let copyRatingVideogames = [...state.videogames];
      let ratingGames =
        action.payload === "1-9"
          ? copyRatingVideogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : copyRatingVideogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: ratingGames,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
