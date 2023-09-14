import NavBar from "../../components/NavBar/NavBar";
import CardsContainerVideogame from "../../components/CardsContainerVideogame/CardsContainerVideogame";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllVideogames, getAllGenres } from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination";

import loading from "../../assets/loading/loading6.gif";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  //Paginado
  let videogamesPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;
  const currentVideogames = videogames.slice(firstIndex, lastIndex);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Función que establece y actualiza la página en la que nos encontramos
  const paginate = (numberPages) => {
    setCurrentPage(numberPages);
  };

  const next = () => {
    if (lastIndex > videogames.length) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (firstIndex < 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <NavBar
        paginate={paginate}
        setCurrentPage={setCurrentPage}
        videogames={videogames.length}
      />
      <div className={styles.homecontainer}>
        <div className={styles.pagination}>
          <Pagination
            videogamesPerPage={videogamesPerPage}
            videogames={videogames.length}
            paginate={paginate}
            next={next}
            prev={prev}
            currentPage={currentPage}
          />
        </div>

        <div>
          {currentVideogames.length > 0 ? (
            <CardsContainerVideogame videogames={currentVideogames} />
          ) : (
            <div className={styles.loadingContainer}>
              <img src={loading} alt="loading" className={styles.loadingImg} />
              <p className={styles.loadingText}>Loading ...</p>
            </div>
          )}
        </div>
        <div className={styles.pagination}>
          <Pagination
            videogamesPerPage={videogamesPerPage}
            videogames={videogames.length}
            paginate={paginate}
            next={next}
            prev={prev}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
