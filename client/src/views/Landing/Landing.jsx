import { Link } from "react-router-dom";

import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={`${styles.landing} ${styles["full-screen-bg"]}`}>
      <Link to="/home">
        <button className={styles.button}> {`Let's get started`} </button>
      </Link>
    </div>
  );
};

export default Landing;
