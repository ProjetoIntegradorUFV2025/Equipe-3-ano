import React, { useState } from 'react';
import PopupTutorial from '../PopupTutorial';
import { useAudio } from '../../contexts/AudioContext';

// Importar imagem de fundo do menu
import menuBarraFundo from '../../assets/Menu-barra.png';

// Importar ícone do menu
import navBarIcon from '../../assets/MenuLateral/NavBar.png';

// Importar SVGs dos botões do menu lateral
import iconVoltarTrilha from '../../assets/MenuLateral/Setinha de voltar.svg';
import iconPontuacao from '../../assets/MenuLateral/Estrela Pontuacao.svg';
import iconSair from '../../assets/MenuLateral/Sair.svg';
import iconTutorial from '../../assets/MenuLateral/Play tutorial.svg';

// --- Componente: Menu de Navegação Reutilizável ---
const MenuNavegacao = ({ 
  onVoltarTrilha, 
  onVoltarMenu,
  onSairConta,
  onAbrirRanking,
  posicao = "top-right", // "top-right", "top-left", "bottom-right", "bottom-left"
  distanciaDoTopo = 180, // Distância regulável do topo do background do menu
  tipoTutorial = "todos" // "conecta", "caca-palavras", "todos"
}) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [tutorialPopupAberto, setTutorialPopupAberto] = useState(false);
  const { volume, changeVolume, isPlaying, togglePlay } = useAudio();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Definir posicionamento baseado na prop
  const getPosicaoClasses = () => {
    switch (posicao) {
      case "top-left":
        return "fixed top-4 left-4 z-30";
      case "bottom-right":
        return "fixed bottom-4 right-4 z-30";
      case "bottom-left":
        return "fixed bottom-4 left-4 z-30";
      default: // "top-right"
        return "fixed top-4 right-4 z-30";
    }
  };

  // Definir posição do dropdown baseado na posição do botão
  const getDropdownClasses = () => {
    switch (posicao) {
      case "top-left":
        return "absolute top-16 left-0";
      case "bottom-right":
        return "absolute bottom-16 right-0";
      case "bottom-left":
        return "absolute bottom-16 left-0";
      default: // "top-right"
        return "absolute top-16 right-0";
    }
  };

  return (
    <>
      {/* Overlay para fechar menu quando clicar fora */}
      {menuAberto && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setMenuAberto(false)}
        ></div>
      )}
      
      <div className={getPosicaoClasses()}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          className="rounded-lg transition-all duration-300 relative z-50 hover:scale-110"
          style={{ 
            backgroundColor: 'transparent',
            padding: 0,
            border: 'none',
            outline: 'none'
          }}
        >
          <img 
            src={navBarIcon} 
            alt="Menu" 
            className="w-16 h-16"
            style={{ display: 'block' }}
          />
        </button>

        {/* Menu com Imagem de Fundo */}
        {menuAberto && (
          <div 
            className="fixed top-0 right-0 h-full w-1/3 z-50 transform transition-transform duration-300 ease-in-out"
            style={{
              backgroundImage: `url(${menuBarraFundo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Container dos botões com distância regulável do topo */}
            <div 
              className="flex flex-col space-y-1 px-6"
              style={{ marginTop: `${distanciaDoTopo}px` }}
            >
              {/* Botão 1: Voltar à Trilha */}
              <button
                onClick={() => {
                  if (onVoltarTrilha) onVoltarTrilha();
                  setMenuAberto(false);
                }}
                className="w-full py-2 px-6 text-white text-3xl font-semibold transition-all duration-200 rounded-lg flex items-center justify-start"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div className="w-16 h-16 mr-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#563060', userSelect: 'none', flexShrink: 0 }}
                >
                  <img 
                    src={iconVoltarTrilha} 
                    alt="Voltar à Trilha" 
                    className="w-8 h-8"
                    style={{ userSelect: 'none' }}
                    draggable="false"
                  />
                </div>
                Voltar à Trilha
              </button>

              {/* Botão 2: Tela de Pontuação (Ranking) */}
              <button
                onClick={() => {
                  setMenuAberto(false);
                  // Abre o ranking diretamente
                  if (onAbrirRanking) {
                    onAbrirRanking();
                  }
                }}
                className="w-full py-2 px-6 text-white text-3xl font-semibold transition-all duration-200 rounded-lg flex items-center justify-start"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div className="w-16 h-16 mr-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#563060', userSelect: 'none', flexShrink: 0 }}
                >
                  <img 
                    src={iconPontuacao} 
                    alt="Pontuação" 
                    className="w-8 h-8"
                    style={{ userSelect: 'none' }}
                    draggable="false"
                  />
                </div>
                Pontuação
              </button>

              {/* Botão 3: Sair da Conta */}
              <button
                onClick={() => {
                  // Fazer logout do jogador
                  // Limpar dados de autenticação do localStorage/sessionStorage
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userSession');
                  localStorage.removeItem('playerData');
                  sessionStorage.clear();
                  
                  // Chamar função de callback se fornecida
                  if (onSairConta) onSairConta();
                  
                  // Fechar menu
                  setMenuAberto(false);
                  
                  // Redirecionar para tela inicial (recarregar página para resetar estado)
                  window.location.href = `${window.location.origin}/desconecta/`;
                }}
                className="w-full py-2 px-6 text-white text-3xl font-semibold transition-all duration-200 rounded-lg flex items-center justify-start"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div className="w-16 h-16 mr-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#563060', userSelect: 'none', flexShrink: 0 }}
                >
                  <img 
                    src={iconSair} 
                    alt="Sair da Conta" 
                    className="w-8 h-8"
                    style={{ userSelect: 'none' }}
                    draggable="false"
                  />
                </div>
                Sair da Conta
              </button>

              {/* Botão 4: Ver Tutorial (não implementado) */}
              <button
                onClick={() => {
                  setTutorialPopupAberto(true);
                  setMenuAberto(false);
                }}
                className="w-full py-2 px-6 text-white text-3xl font-semibold transition-all duration-200 rounded-lg flex items-center justify-start"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div className="w-16 h-16 mr-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#563060', userSelect: 'none', flexShrink: 0 }}
                >
                  <img 
                    src={iconTutorial} 
                    alt="Ver Tutorial" 
                    className="w-8 h-8"
                    style={{ userSelect: 'none' }}
                    draggable="false"
                  />
                </div>
                Ver Tutorial
              </button>

              {/* Botão 5: Controle de Áudio */}
              <div className="w-full py-2 px-6 rounded-lg flex items-center justify-start transition-all duration-200"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {/* Ícone de Áudio */}
                <div className="w-16 h-16 mr-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#563060', color: '#ffffff' }}
                >
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </div>
                
                {/* Controle de Volume */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => changeVolume(e.target.value / 100)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #563060 0%, #563060 ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`,
                    outline: 'none'
                  }}
                />
                
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ffffff;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ffffff;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  }
                `}</style>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup de Tutorial */}
      <PopupTutorial 
        isOpen={tutorialPopupAberto}
        onClose={() => setTutorialPopupAberto(false)}
        tipoTutorial={tipoTutorial}
      />
    </>
  );
};

export default MenuNavegacao;
