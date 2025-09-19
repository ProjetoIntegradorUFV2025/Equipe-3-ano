import React from 'react';
import MenuNavegacao from './ui/MenuNavegacao';

// Importar imagem de fundo
import fundoPontuacao from '../assets/fundo-tela-pontuacao.png';

// --- Componente: Tela Pontuação ---
const TelaPontuacao = ({ onVoltarTrilha, onVoltarMenu }) => {
  // Valores temporários para exemplo - estes podem vir como props no futuro
  const tempoSegundos = 120;
  const tentativas = 3;
  const pontos = 850;
  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${fundoPontuacao})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Menu de Navegação Reutilizável */}
      <MenuNavegacao 
        onVoltarTrilha={onVoltarTrilha}
        onVoltarMenu={onVoltarMenu}
        posicao="top-right"
      />

      {/* Conteúdo da tela de pontuação */}
      <div className="w-full h-screen flex items-end justify-center pb-4">
        <div className="text-white">
          <div className="text-5xl font-sans font-bold leading-relaxed mb-16">
            <div className="mb-2 text-left">Tempo ...................... {tempoSegundos}</div>
            <div className="mb-4 text-left">Tentativas ................. {tentativas}</div>
            <div className="text-5xl font-bold text-center" style={{ color: '#feeb6c' }}>+{pontos} pontos</div>
          </div>
          
          {/* Botão Concluir */}
          <div className="text-center">
            <button
              onClick={onVoltarTrilha}
              className="text-white font-bold py-6 px-16 rounded-full text-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ 
                backgroundColor: '#f93d6e',
                ':hover': { backgroundColor: '#e02a5b' }
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e02a5b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f93d6e'}
            >
              CONCLUIR
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TelaPontuacao;