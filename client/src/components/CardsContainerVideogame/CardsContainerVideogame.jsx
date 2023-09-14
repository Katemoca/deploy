/* eslint-disable react/prop-types */
import CardVideogame from "../CardVideogame/CardVideogame";
import styles from "./CardsContainerVideogame.module.css";

const CardsContainerVideogame = ({ videogames }) => {
  return (
    <>
      <div className={styles.cardscontainer}>
        {videogames?.map(({ id, name, background_image, rating, genres }) => {
          return (
            <CardVideogame
              key={id}
              id={id}
              name={name}
              background_image={background_image}
              rating={rating}
              genres={genres}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardsContainerVideogame;
