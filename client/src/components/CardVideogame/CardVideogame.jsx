/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CardVideogame.module.css";

const CardVideogame = ({ id, name, background_image, rating, genres }) => {
  return (
    <>
      <Link className={styles.link} to={`/detail/${id}`}>
        <div className={styles.card}>
          <div className={styles.poster}>
            <img
              className={styles.image}
              src={
                background_image
                  ? background_image
                  : "https://fakeimg.pl/400x400/be47d9/c42b2b?text=No+image"
              }
              alt={name}
            />
          </div>
          <div className={styles.details}>
            <div className={styles.name_cont}>
              <h2 className={styles.name}>{name}</h2>
            </div>
            <div className={styles.rating_cont}>
              <h2>RATING: {rating}</h2>
            </div>
            <div className={styles.genres_card_cont}>
              {genres.map((g, index) => (
                <ol key={index}>{g}</ol>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardVideogame;
