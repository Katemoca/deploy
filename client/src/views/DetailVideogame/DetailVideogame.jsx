import {
  getVideogameByDetail,
  deleteDetailVideogame,
  getAllVideogames,
  resetDetailToHome,
} from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import loading from "../../assets/loading/loading6.gif";
import styles from "./DetailVideogame.module.css";

const DetailVideogame = () => {
  const { detailId } = useParams();
  const detail = useSelector((state) => state.videogameDetail);
  const dispatch = useDispatch();

  // Función para remover carácteres y elementos/tags HTML (&lt;)
  const removeTagsAndEntities = (input) => {
    const withoutTags = input.replace(/<\/?[^>]+(>|$)/g, "");
    const withoutEntities = withoutTags.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });
    return withoutEntities;
  };

  useEffect(() => {
    dispatch(getVideogameByDetail(detailId));
    return () => {
      dispatch(resetDetailToHome());
    };
  }, [dispatch, detailId]);

  const handleDelete = (detailId) => {
    console.log("Delete button clicked");
    dispatch(deleteDetailVideogame(detailId));
    dispatch(getAllVideogames());
  };

  return (
    <>
      <div className={styles.main_container}>
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
        <Link to="/create">
          <button className={styles.button}>Create your videogame</button>
        </Link>
      </div>
      <div className={styles.detail_background}>
        {detail.name ? (
          <div className={styles.container_detail}>
            {detail.createdVideoGame === true ? (
              <Link to="/home">
                <button className={styles.button_delete} onClick={handleDelete}>
                  DELETE GAME
                </button>
              </Link>
            ) : (
              <p className={styles.message}>{`You can't delete this game`}.</p>
            )}
            <h2>{detail.name}</h2>
            <img
              src={
                detail.background_image
                  ? detail.background_image
                  : "https://fakeimg.pl/400x400/be47d9/c42b2b?text=No+image"
              }
              className={styles.image}
              alt={detail.name}
            />
            <div className={styles.text_full_detail}>
              <p>
                <strong>Id: </strong>
                {detail.id}
              </p>
              <p>
                <strong>Platforms: </strong>
                {detail.platforms.join(", ")}
              </p>
              <p>
                <strong>Release Date: </strong>
                {detail.released}
              </p>
              <p>
                <strong>Rating: </strong>
                {detail.rating}
              </p>
              <p>
                <strong>Genres: </strong>
                {detail.genres.length
                  ? detail.genres.join(", ")
                  : "There aren't any genres for this videogame"}
              </p>
              <p>
                <strong>Description: </strong>
                {removeTagsAndEntities(detail.description)}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            <img src={loading} alt="loading" className={styles.loadingImg} />
            <p className={styles.loadingText}>Loading ...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailVideogame;
