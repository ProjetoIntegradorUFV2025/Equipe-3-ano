import React, { useState } from 'react';

// --- Componente: Menu de Navegação Reutilizável ---
const MenuNavegacao = ({ 
  onVoltarTrilha, 
  onVoltarMenu, 
  mostrarVoltarTrilha = true, 
  mostrarVoltarMenu = true,
  posicao = "top-right" // "top-right", "top-left", "bottom-right", "bottom-left"
}) => {
  const [menuAberto, setMenuAberto] = useState(false);

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
          className="p-3 rounded-lg shadow-lg transition-all duration-300 relative z-50"
          style={{ 
            backgroundColor: '#563066',
            opacity: 0.9
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4a2857';
            e.target.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#563066';
            e.target.style.opacity = '0.9';
          }}
        >
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        {/* Menu Lateral */}
        {menuAberto && (
          <div 
            className="fixed top-0 right-0 h-full w-1/4 z-50 transform transition-transform duration-300 ease-in-out rounded-l-2xl"
            style={{ backgroundColor: '#563066' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do menu */}
            <div className="p-6 border-b" style={{ borderColor: '#4a2857' }}>
              <h3 className="text-xl font-bold text-white">Menu de Navegação</h3>
            </div>
            
            {/* Lista de opções */}
            <div className="py-4">
              {mostrarVoltarTrilha && onVoltarTrilha && (
                <button
                  onClick={() => {
                    onVoltarTrilha();
                    setMenuAberto(false);
                  }}
                  className="w-full px-6 py-4 text-left text-white text-lg transition-colors duration-200 border-b flex items-center"
                  style={{ 
                    borderColor: '#4a2857',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span className="mr-3">🏝️</span>
                  Voltar à Trilha
                </button>
              )}
              {mostrarVoltarMenu && onVoltarMenu && (
                <button
                  onClick={() => {
                    onVoltarMenu();
                    setMenuAberto(false);
                  }}
                  className="w-full px-6 py-4 text-left text-white text-lg transition-colors duration-200 flex items-center"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span className="mr-3">🏠</span>
                  Menu Principal
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuNavegacao;