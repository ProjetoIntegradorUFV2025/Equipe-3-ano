import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BotaoCliquesMock from "./components/BotaoCliquesMock";
import Parabens from "./components/Parabens";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<BotaoCliquesMock />} />
      <Route path="/parabens" element={<Parabens />} />
    </Routes>
  </BrowserRouter>
);

