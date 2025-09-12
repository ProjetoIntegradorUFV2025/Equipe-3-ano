import React, { useState } from "react";
import TelaInicial from "./components/TelaInicial";

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
      {tela === "login" && <h1 className="text-3xl">Tela de Login</h1>}
      {tela === "cadastro" && <h1 className="text-3xl">Tela de Cadastro</h1>}
    </>
  );
}

export default App;
