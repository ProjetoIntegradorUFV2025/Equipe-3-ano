import React, { useState } from 'react';
import fundoTelaLogin from '../assets/fundo-da-tela-inicial.png';
import tiuloSaducao from '../assets/Titulo saudações.png';
import mascoteImg from "../assets/Dadinho Pulando.png";
import { GamepadIcon, StarIcon } from './ui/botoes';

// --- Componente Principal: Tela de Jogo ---
const TelaJogo = () => {
  const handleJogar = () => {
    // Adicione a lógica para iniciar o jogo aqui
    alert("Iniciando o jogo...");
  };

  const handleVerPontuacao = () => {
    // Adicione a lógica para mostrar a pontuação aqui
    alert("Mostrando a pontuação...");
  };

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundColor: '#4a919e', backgroundImage: `url(${fundoTelaLogin})`, backgroundSize: 'cover' }}
    >

        {/* --- IMAGEM DO DADINHO*/}
        <div className="absolute -center-20 left-9 p-4"
        style={{ 
          top: '50%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
        }}>
        <img
            src={mascoteImg}
            alt="Mascote do Jogo"
            className="w-[620px] scale-x-[-1]"
        />
        </div>
 
      {/* Container titulo saudacao */}
      <div className="absolute"
        style={{ 
          top: '30%',
          left: '72%',
          transform: 'translate(-50%, -50%)',
          width: '750px', 
          maxWidth: '90vw' 
        }}
      >
        <img
            src={tiuloSaducao}
            alt="Que bom te ver!"
            className="w-full max-w-4xl"
        />
      </div>

      {/* Container dos botões */}
      <div 
        className="absolute flex flex-col gap-8 items-center"
        style={{ 
          top: '80%',
          left: '75%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Botão Jogar */}
        <button
          onClick={handleJogar}
          // 2. Corrigi a largura do botão aqui
          className="flex items-center  w-[500px] gap-4 py-6 text-white font-bold text-4xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
          style={{ backgroundColor: '#563066' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#563066'}
        >
          <GamepadIcon />
          <span>Jogar</span>
        </button>

        {/* Botão Ver Pontuação */}
        <button
          onClick={handleVerPontuacao}
           // 2. Corrigi a largura do botão aqui para ser igual ao de cima
          className="flex items-center  w-[500px] gap-4 py-6 text-white font-bold text-4xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
          style={{ backgroundColor: '#563066' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#563066'}
        >
          <StarIcon />
          <span>Ver Pontuação</span>
        </button>

      </div>
    </main>
  );
};

export default TelaJogo;

