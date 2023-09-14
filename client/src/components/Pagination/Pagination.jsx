/* eslint-disable react/prop-types */
import styles from "./Pagination.module.css";

const Pagination = ({
  videogamesPerPage,
  videogames,
  paginate,
  next,
  prev,
  currentPage,
}) => {
  const numberPages = [];

  for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
    numberPages.push(i);
  }

  return (
    <>
      <div className={styles.pagination}>
        <button onClick={() => prev()} className={styles.buttonPrevNext}>
          Prev
        </button>
        {numberPages.map((numberPage) => (
          <div key={numberPage} className={styles.cont_num_page}>
            <button
              onClick={() => paginate(numberPage)}
              className={`${styles.test} ${
                currentPage === numberPage
                  ? styles.currentPage
                  : styles.notCurrentPage
              }`}>
              {numberPage}
            </button>
          </div>
        ))}
        <button onClick={() => next()} className={styles.buttonPrevNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
