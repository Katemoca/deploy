/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {
  filterByGenre,
  filterByOrigin,
  filterByOrder,
  filterByRating,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NavBar.module.css";

const NavBar = ({ paginate, videogames }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.copyGenres);

  // HANDLERS PARA LOS FILTROS
  const handleFilterOrigin = (event) => {
    const { value } = event.target;
    dispatch(filterByOrigin(value));
  };
  const handleFilterGenres = (event) => {
    const { value } = event.target;
    event.preventDefault();
    dispatch(filterByGenre(value));
  };
  const handleFilterByOrder = (event) => {
    const { value } = event.target;
    event.preventDefault();
    dispatch(filterByOrder(value));
  };
  const handleFilterByRating = (event) => {
    const { value } = event.target;
    event.preventDefault();
    dispatch(filterByRating(value));
  };

  return (
    <>
      <div className={styles.container}>
        <Link to="/">
          <button className={styles.buttonLink}>LOGOUT</button>
        </Link>
        <Link to="/create">
          <button className={styles.buttonLink}>CREATE YOUR VIDEOGAME</button>
        </Link>
        <Link to="/about">
          <button className={styles.buttonLink}>ABOUT</button>
        </Link>
        <div>
          <div className={styles.searchbar}>
            <SearchBar paginate={paginate} videogames={videogames} />
          </div>

          <select
            className={styles.select}
            name=""
            defaultValue="0"
            id="orderByOrigin"
            onChange={(event) => handleFilterOrigin(event)}>
            <option disabled value="0">
              Filter by Origin
            </option>
            <option value="all">All videogames</option>
            <option value="db">Created videogames </option>
            <option value="api">API videogames</option>
          </select>

          <select
            className={styles.select}
            defaultValue="0"
            id="filterByGenre"
            onChange={handleFilterGenres}>
            <option disabled value="0">
              Filter by genres
            </option>

            {genres?.map((game, index) => (
              <option key={index} value={game}>
                {game}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            defaultValue="0"
            id="orderByName"
            onChange={(event) => handleFilterByOrder(event)}>
            <option disabled value="0">
              Order by name
            </option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>

          <select
            className={styles.select}
            defaultValue="0"
            id="orderByRating"
            onChange={(event) => handleFilterByRating(event)}>
            <option disabled value="0">
              Order by rating
            </option>
            <option value="9-1">Highest to lowest</option>
            <option value="1-9">Lowest to highest</option>
          </select>
        </div>
        <div>
          <button
            className={styles.buttonLink}
            onClick={() => {
              window.location.reload();
            }}>
            RESET ALL
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
