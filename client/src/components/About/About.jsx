import { Link } from "react-router-dom";

import profile from "./Images/imgperfil.jpg";
import github from "./Images/github.png";
import linkedin from "./Images/linkedin.png";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.main_cont_about}>
        <Link to="/home">
          <button className={styles.button_home}>Home</button>
        </Link>
      </div>
      <div className={styles.cont_about}>
        <img className={styles.img_profile} src={profile} />
        <h2 className={styles.name_about}>My name is Katerin</h2>
        <h2
          className={
            styles.subtitle_name
          }>{`I'm a fullstack junior developer`}</h2>
        <div className={styles.img_cont}>
          <a
            className={styles.github_a}
            href="https://github.com/Katemoca"
            target="_blank"
            rel="noreferrer">
            <img src={github} className={styles.img_github} alt="github" />
          </a>
        </div>
        <div className={styles.img_cont}>
          <a
            className={styles.linkedin_a}
            href="https://www.linkedin.com/in/katerincastromongua/"
            target="_blank"
            rel="noreferrer">
            <img
              src={linkedin}
              className={styles.img_linkedin}
              alt="linkedin"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
