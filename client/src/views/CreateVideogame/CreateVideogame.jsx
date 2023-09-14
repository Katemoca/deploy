/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, postVideogame } from "../../redux/actions";
import { validations } from "../../utils/validations";

import styles from "./CreateVideogame.module.css";

const CreateVideogame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: 0,
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: 0,
    genres: [],
  });

  useEffect(() => {
    setErrors(validations(form));
  }, [form]);

  // Handler para inputs (name, img, description)
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  //Handler para el input de platforms
  const handlePlatformInput = (event) => {
    if (event.target.name === "platforms") {
      setForm({
        ...form,
        platforms: [
          ...form.platforms,
          document.getElementById(event.target.id).value,
        ],
      });
      document.getElementById(event.target.id).value = "";
    }
  };

  //Handler para el select de géneros
  const handleSelectedGenres = (event) => {
    if (event.target.name === "genres") {
      if (form.genres.includes(event.target.value)) return;
      setForm({
        ...form,
        genres: [...form.genres, event.target.value],
      });
    }
  };

  // Handler para evento onClick para remover items
  const removeFromArrayHandler = (event, property) => {
    const removedItem = event.target.textContent;
    const updatedArrayOfProperty = form[property].filter(
      (item) => item !== removedItem
    );
    setForm({ ...form, [property]: updatedArrayOfProperty });
  };

  // Remover plataforma escrita en input
  const handleClickedPlatform = (event) => {
    removeFromArrayHandler(event, "platforms");
  };

  //Remover género seleccionado en select
  const handleClickedGenre = (event) => {
    removeFromArrayHandler(event, "genres");
  };

  //Handler para input tipo "range" en rating
  const handleRangeRating = (event) => {
    const value = parseFloat(event.target.value);
    if (event.target.name === "rating") {
      setForm({ ...form, rating: value });
    }
  };

  // Handler para el submit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideogame(form));
    setForm({
      name: "",
      description: "",
      platforms: [],
      background_image: "",
      released: "",
      rating: 0,
      genres: [],
    });
  };

  // Función para deshabilitar el botón submit
  const disableButton = () => {
    let disabled;
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true;
        break;
      }
    }
    return disabled;
  };

  // console.log("ESTE ES EL INPUT", form);

  return (
    <div className={styles["full-screen-bg"]}>
      <div className={styles.create}>
        <div className={styles.form}>
          <Link to="/home">
            <button className={styles.buttonGoBack}>Go back</button>
          </Link>
          <form onSubmit={handleSubmit}>
            <p className={styles.title}>
              Here you can create your own videogame
            </p>
            <div>
              <label style={{ fontWeight: "bold" }}>Name: </label>
              <input
                type="text"
                className={styles.inputs}
                value={form.name}
                name="name"
                onChange={handleChange}
                placeholder="Write the name of your videogame here"
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Image URL: </label>
              <input
                type="text"
                className={styles.inputs}
                value={form.background_image}
                name="background_image"
                onChange={handleChange}
                placeholder="Write the url here"
              />
              {errors.background_image && (
                <span className={styles.error}>{errors.background_image}</span>
              )}
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Description: </label>
              <input
                type="text"
                className={styles.inputs}
                value={form.description}
                name="description"
                onChange={handleChange}
                placeholder="Write your description"
              />
              {errors.description && (
                <span className={styles.error}>{errors.description}</span>
              )}
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Platforms: </label>
              <input
                type="text"
                className={styles.inputs}
                id="platforms"
                name="platforms"
                placeholder="Write the platform here"></input>

              <button
                type="button"
                className={styles.buttonPlatforms}
                id="platforms"
                name="platforms"
                onClick={handlePlatformInput}>
                Add platform
              </button>
              <div className={styles.error_cont}>
                {errors.platforms && (
                  <span className={styles.error}>{errors.platforms}</span>
                )}
              </div>
              <div>
                {form.platforms.map((platform, index) => (
                  <div key={index}>
                    <button value={platform} onClick={handleClickedPlatform}>
                      {platform}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontWeight: "bold" }}>Rating: </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                className={styles.inputs}
                value={form.rating}
                name="rating"
                onChange={handleRangeRating}
              />
              {errors.rating && (
                <span className={styles.error}>{errors.rating}</span>
              )}
              <div className={styles.rating_text_cont}>
                <p>{form.rating}</p>
              </div>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Released Date: </label>
              <input
                className={styles.inputs}
                type="date"
                value={form.released}
                name="released"
                onChange={handleChange}
              />
              {errors.released && (
                <span className={styles.error}>{errors.released}</span>
              )}
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Genres: </label>
              <select
                name="genres"
                id="genres"
                onChange={handleSelectedGenres}
                defaultValue="0">
                <option disabled value="0">
                  Genres
                </option>
                {genres?.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <div className={styles.error_cont}>
                {errors.genres && (
                  <span className={styles.error}>{errors.genres}</span>
                )}
              </div>
              <div>
                {form.genres.map((genre, index) => (
                  <div key={index}>
                    <button value={genre} onClick={handleClickedGenre}>
                      {genre}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className={styles.submitbutton}
              disabled={disableButton()}>
              Create my videogame
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVideogame;
