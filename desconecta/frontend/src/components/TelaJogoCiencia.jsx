import React, { useState, useEffect } from 'react';
import MenuNavegacao from './ui/MenuNavegacao';

// Importar todas as imagens estaticamente
import img1 from '../assets/HisotiaCiencia/HistoriaBiologia_1.png';
import img2 from '../assets/HisotiaCiencia/HistoriaBiologia_2.png';
import img3 from '../assets/HisotiaCiencia/HistoriaBiologia_3.png';
import img4 from '../assets/HisotiaCiencia/HistoriaBiologia_4.png';
import img5 from '../assets/HisotiaCiencia/HistoriaBiologia_5.png';
import img6 from '../assets/HisotiaCiencia/HistoriaBiologia_6.png';
import img7 from '../assets/HisotiaCiencia/HistoriaBiologia_7.png';
import img8 from '../assets/HisotiaCiencia/HistoriaBiologia_8.png';
import img9 from '../assets/HisotiaCiencia/HistoriaBiologia_9.png';
import img10 from '../assets/HisotiaCiencia/HistoriaBiologia_10.png';
import img11 from '../assets/HisotiaCiencia/HistoriaBiologia_11.png';
import img12 from '../assets/HisotiaCiencia/HistoriaBiologia_12.png';
import img13 from '../assets/HisotiaCiencia/HistoriaBiologia_13.png';
import img14 from '../assets/HisotiaCiencia/HistoriaBiologia_14.png';
import img15 from '../assets/HisotiaCiencia/HistoriaBiologia_15.png';
import img16 from '../assets/HisotiaCiencia/HistoriaBiologia_16.png';
import img17 from '../assets/HisotiaCiencia/HistoriaBiologia_17.png';
import img18 from '../assets/HisotiaCiencia/HistoriaBiologia_18.png';
import img19 from '../assets/HisotiaCiencia/HistoriaBiologia_19.png';
import img20 from '../assets/HisotiaCiencia/HistoriaBiologia_20.png';
import img21 from '../assets/HisotiaCiencia/HistoriaBiologia_21.png';
import img22 from '../assets/HisotiaCiencia/HistoriaBiologia_22.png';
import img23 from '../assets/HisotiaCiencia/HistoriaBiologia_23.png';
import img24 from '../assets/HisotiaCiencia/HistoriaBiologia_24.png';

// Array com todas as imagens em ordem (filtra apenas as que foram importadas com sucesso)
const imagens = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24
].filter(img => img !== undefined);

// --- Componente: Tela Jogo Ciência ---
const TelaJogoCiencia = ({ onVoltarTrilha, onVoltarMenu }) => {
  const [imagemAtual, setImagemAtual] = useState(0);
  const [podeNavegar, setPodeNavegar] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(0);

  // Debug: verificar se as imagens foram carregadas
  console.log('Total de imagens carregadas:', imagens.length);
  console.log('Imagem atual:', imagens[imagemAtual]);

  // Cleanup dos timers quando o componente for desmontado
  useEffect(() => {
    return () => {
      // Limpar qualquer timer ativo
      setPodeNavegar(true);
      setTempoRestante(0);
    };
  }, []);

  const iniciarTimer = () => {
    setPodeNavegar(false);
    setTempoRestante(3);
    
    const timer = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPodeNavegar(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const proximaImagem = () => {
    if (podeNavegar && imagemAtual < imagens.length - 1) {
      setImagemAtual(prev => prev + 1);
      iniciarTimer();
    }
  };

  const imagemAnterior = () => {
    if (imagemAtual > 0) {
      setImagemAtual(prev => prev - 1);
      // Não inicia timer para voltar - deixa livre
    }
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Menu de Navegação Reutilizável */}
      <MenuNavegacao 
        onVoltarTrilha={onVoltarTrilha}
        onVoltarMenu={onVoltarMenu}
        posicao="top-right"
      />

      {/* Imagem em tela cheia */}
      <div className="w-full h-screen flex items-center justify-center relative">
        {imagens.length > 0 ? (
          <img
            src={imagens[imagemAtual]}
            alt={`História da Ciência - Slide ${imagemAtual + 1}`}
            className="max-w-full max-h-full object-contain"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'contain'
            }}
            onError={(e) => {
              console.error('Erro ao carregar imagem:', e.target.src);
            }}
            onLoad={() => {
              console.log('Imagem carregada com sucesso:', imagens[imagemAtual]);
            }}
          />
        ) : (
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Carregando imagens...</h2>
            <p className="text-xl">Nenhuma imagem foi encontrada na pasta HisotiaCiencia</p>
          </div>
        )}
      </div>

      {/* Botão Anterior - Extremo esquerdo */}
      <button
        onClick={imagemAnterior}
        disabled={imagens.length === 0 || imagemAtual === 0}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-20 flex items-center justify-center"
        style={{
          width: 'min(40px, 5vw)',
          height: 'min(40px, 5vw)',
          fontSize: 'min(30px, 4vw)'
        }}
      >
        ‹
      </button>

      {/* Botão Próximo - Extremo direito */}
      <button
        onClick={proximaImagem}
        disabled={imagens.length === 0 || imagemAtual === imagens.length - 1 || !podeNavegar}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-20 flex items-center justify-center"
        style={{
          width: 'min(40px, 5vw)',
          height: 'min(40px, 5vw)',
          fontSize: 'min(30px, 4vw)'
        }}
      >
        ›
      </button>
    </main>
  );
};

export default TelaJogoCiencia;