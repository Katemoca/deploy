import { Route, Routes } from "react-router-dom";
import { Landing, Home, Create, DetailVideogame } from "../src/views/index";
import About from "./components/About/About";
import axios from "axios";
axios.defaults.baseURL = "https://deploy-production-b9c6.up.railway.app";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:detailId" element={<DetailVideogame />} />
      </Routes>
    </div>
  );
};

export default App;
