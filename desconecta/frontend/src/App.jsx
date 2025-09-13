import React, { useState } from "react";
import TelaInicial from "./components/TelaInicial";
import TelaCadastro from "./components/TelaCadastro";
import TelaLogin from "./components/TelaLogin";


function App() {
  const [tela, setTela] = useState("inicial");

  return (
    <>
      {tela === "inicial" && (
        <TelaInicial
          irParaLogin={() => setTela("login")}
          irParaCadastro={() => setTela("cadastro")}
        />
      )}
      {tela === "login" && (
        <TelaLogin
          voltarParaInicial={() => setTela("inicial")}
          irParaCadastro={() => setTela("cadastro")}
        />
      )}
      {tela === "cadastro" && (
        <TelaCadastro
          voltarParaInicial={() => setTela("inicial")}
          irParaLogin={() => setTela("login")}
        />
      )}
    </>
  );
}

export default App;
