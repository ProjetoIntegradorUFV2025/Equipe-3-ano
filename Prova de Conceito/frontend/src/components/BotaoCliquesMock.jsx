import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/dadinho-pulando.png";
import Modal from "./Modal.jsx";

export default function BotaoCliquesMock() {
  const [totalCliques, setTotalCliques] = useState(0);
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Função simulando POST /clicar
  const registrarClique = () => {
    const novoTotal = totalCliques + 1;
    setTotalCliques(novoTotal);

    if (novoTotal >= 10) setShowExtraButton(true);
  };

  // Função chamada ao clicar no botão extra
  const handleExtraClick = () => {
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
      navigate("/parabens");
    }, 2000);
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen gap-5 p-5 bg-contain bg-center bg-fixed bg-slate-400"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <h1 className="text-2xl font-bold text-slate-900">
        Total de Cliques: {totalCliques}
      </h1>

      <button
        onClick={registrarClique}
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
      >
        Clicar
      </button>

      {showExtraButton && (
        <button
          onClick={handleExtraClick}
          className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-lg hover:bg-green-600 transition"
        >
          Mostrar Pop-up
        </button>
      )}

      {modalOpen && <Modal />}
    </div>
  );
}

