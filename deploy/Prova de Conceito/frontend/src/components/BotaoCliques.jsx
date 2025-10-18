import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/dadinho-pulando.png";
import Modal from "./Modal.jsx";

export default function BotaoCliquesBackend() {
  const [totalCliques, setTotalCliques] = useState(0);
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // URL da API do backend
  //TODO: Tentar URL sem contador
  //const API_URL = `${window.location.origin}/api/contador`; //"http://localhost:8080/api/contador";

  // Detecta se estamos rodando dentro de /provaConceito ou raiz
  const contextPath = window.location.pathname.startsWith('/provaConceito') 
  ? '/provaConceito' 
  : '';

// URL base da API
  const API_URL = `${window.location.origin}${contextPath}/api/contador`;

  // Buscar o total inicial de cliques no backend
  const fetchCliques = async () => {
    try {
      const res = await fetch(`${API_URL}/status`);
      const data = await res.json();
      setTotalCliques(data.total);
      setShowExtraButton(data.dezCliques);
    } catch (err) {
      console.error("Erro ao buscar total de cliques:", err);
    }
  };

  useEffect(() => {
    fetchCliques();
  }, []);

  // Função que chama o backend para registrar clique
  const registrarClique = async () => {
    try {
      const res = await fetch(`${API_URL}/clicar`, {
        method: "POST",
      });
      const novoTotal = await res.json();
      setTotalCliques(novoTotal);

      if (novoTotal >= 10) setShowExtraButton(true);
    } catch (err) {
      console.error("Erro ao registrar clique:", err);
    }
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

