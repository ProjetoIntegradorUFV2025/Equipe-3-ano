import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BotaoCliques from "./components/BotaoCliques";
import Parabens from "./components/Parabens";
import "./index.css";

//Alterar para /provaConceito quando fizer deploy
const basename = "/provaConceito/"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <Routes>
      <Route path="/" element={<BotaoCliques />} />
      <Route path="/parabens" element={<Parabens />} />
    </Routes>
  </BrowserRouter>
);

