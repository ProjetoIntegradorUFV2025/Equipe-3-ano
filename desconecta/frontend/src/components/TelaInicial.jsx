import React from 'react';
import fundoTelaLogin from '../assets/fundo-tela-login.png';

// --- Componente Principal: Tela Inicial ---
// Tela inicial com fundo e dois botões centralizados
const TelaInicial = ({ irParaLogin, irParaCadastro }) => {
  const handleEntrar = () => {
    console.log('Navegando para a tela de Login...');
    irParaLogin(); // Chama a função passada pelo App.jsx
  };

  const handleCadastrar = () => {
    console.log('Navegando para a tela de Cadastro...');
    irParaCadastro(); // Chama a função passada pelo App.jsx
  };

  return (
    <main 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${fundoTelaLogin})` }}
    >
      <div 
        className="absolute flex flex-col gap-24"
        style={{ 
          top: '40%',    /* ← MOVER VERTICALMENTE: altere este valor */
          left: '50%',   /* ← MOVER HORIZONTALMENTE: altere este valor */
          transform: 'translate(0%, 20%)' /* ← Mantém centralizado no ponto */
        }}
      >
        <button
          onClick={handleEntrar}
          className="px-40 py-7 text-white font-bold text-5xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: '#563066' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#563066'}
        >
          Entrar
        </button>
        
        <button
          onClick={handleCadastrar}
          className="px-40 py-7 text-white font-bold text-5xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: '#563066' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#563066'}
        >
          Cadastrar
        </button>
      </div>
    </main>
  );
};

export default TelaInicial;

