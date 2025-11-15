import React, { useState, useEffect } from 'react';
import MenuNavegacao from './ui/MenuNavegacao';
import TelaPontuacao from './TelaPontuacao';
import JogoMatematica from './JogoMatematica';

// Importar imagem da seta
import arrowLeftCircle from '../assets/Arrow - Left Circle.png';

// Importar todas as imagens estaticamente da pasta HistoriaMatematica
import img1 from '../assets/HistoriaMatematica/MatematicaQuadro1.gif';
import img2 from '../assets/HistoriaMatematica/MatematicaQuadro2.gif';
import img3 from '../assets/HistoriaMatematica/MatematicaQuadro3.gif';
import img4 from '../assets/HistoriaMatematica/MatematicaQuadro4.gif';
import img5 from '../assets/HistoriaMatematica/MatematicaQuadro5.gif';
import img6 from '../assets/HistoriaMatematica/MatematicaQuadro6.gif';
import img7 from '../assets/HistoriaMatematica/MatematicaQuadro7.gif';
import img8 from '../assets/HistoriaMatematica/MatematicaQuadro8.gif';
import img9 from '../assets/HistoriaMatematica/MatematicaQuadro9.gif';
import img10 from '../assets/HistoriaMatematica/MatematicaQuadro10.gif';
import img11 from '../assets/HistoriaMatematica/MatematicaQuadro11.gif';
import img12 from '../assets/HistoriaMatematica/MatematicaQuadro12.gif';
import img13 from '../assets/HistoriaMatematica/MatematicaQuadro13.gif';
import img14 from '../assets/HistoriaMatematica/MatematicaQuadro14.gif';
import img15 from '../assets/HistoriaMatematica/MatematicaQuadro15.gif';
import img16 from '../assets/HistoriaMatematica/MatematicaQuadro16.gif';
import img17 from '../assets/HistoriaMatematica/MatematicaQuadro17.gif';
import img18 from '../assets/HistoriaMatematica/MatematicaQuadro18.gif';
import img19 from '../assets/HistoriaMatematica/MatematicaQuadro19.gif';
import img20 from '../assets/HistoriaMatematica/MatematicaQuadro20.gif';
import img21 from '../assets/HistoriaMatematica/MatematicaQuadro21.gif';
import img22 from '../assets/HistoriaMatematica/MatematicaQuadro22.gif';
import img23 from '../assets/HistoriaMatematica/MatematicaQuadro23.gif';
import img24 from '../assets/HistoriaMatematica/MatematicaQuadro24.gif';
import img25 from '../assets/HistoriaMatematica/MatematicaQuadro25.gif';
import img26 from '../assets/HistoriaMatematica/MatematicaQuadro26.gif';
import img27 from '../assets/HistoriaMatematica/MatematicaQuadro27.gif';

// Array com todas as imagens em ordem (filtra apenas as que foram importadas com sucesso)
const imagens = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27
].filter(img => img !== undefined);

// --- Componente: Tela Jogo Matemática ---
const TelaJogoMatematica = ({ onVoltarTrilha, onVoltarMenu, onAbrirRanking }) => {
  const [imagemAtual, setImagemAtual] = useState(0);
  const [podeNavegar, setPodeNavegar] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [mostrarPontuacao, setMostrarPontuacao] = useState(false);
  const [mostrarJogoMatematica, setMostrarJogoMatematica] = useState(false);
  const [jogoMatematicaConcluido, setJogoMatematicaConcluido] = useState(false);

  // Debug: verificar se as imagens foram carregadas
  // console.log('Total de imagens carregadas:', imagens.length);
  // console.log('Imagem atual:', imagens[imagemAtual]);

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
    setTempoRestante(0);
    
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
      // Se estamos na imagem 25 (índice 24), ir para JogoMatematica
      if (imagemAtual === 24) {
        setMostrarJogoMatematica(true);
      } else {
        setImagemAtual(prev => prev + 1);
        iniciarTimer();
      }
    } else if (podeNavegar && imagemAtual === imagens.length - 1) {
      // Última imagem - redirecionar para pontuação
      setMostrarPontuacao(true);
    }
  };

  const imagemAnterior = () => {
    // Permite voltar em todas as imagens, EXCETO na imagem 26 (índice 25)
    // que é a imagem imediatamente após o jogo JogoMatematica
    if (imagemAtual > 0 && imagemAtual !== 25) {
      setImagemAtual(prev => prev - 1);
      // Não inicia timer para voltar - deixa livre
    }
  };

  // Se deve mostrar a tela JogoMatematica, renderizar JogoMatematica
  if (mostrarJogoMatematica) {
    return (
      <JogoMatematica 
        onVoltarTrilha={onVoltarTrilha} 
        onVoltarMenu={onVoltarMenu}
        onAbrirRanking={onAbrirRanking}
        onConcluido={() => {
          // Após concluir o jogo, voltar para img26 (índice 25)
          setImagemAtual(25);
          setMostrarJogoMatematica(false);
          setJogoMatematicaConcluido(true);
        }}
      />
    );
  }

  // Se deve mostrar a tela de pontuação, renderizar TelaPontuacao
  if (mostrarPontuacao) {
    // Matemática corresponde ao enum posição 2 (0=DADOLANDIA, 1=CIENCIAS, 2=MATEMATICA, 3=GEOGRAFIA, 4=HISTORIA)
    return <TelaPontuacao 
      onVoltarTrilha={onVoltarTrilha} 
      onVoltarMenu={onVoltarMenu}
      onAbrirRanking={onAbrirRanking}
      ilhaCompletada={2} 
      nomeIlhaJogada="MATEMATICA" 
    />;
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Menu de Navegação Reutilizável */}
      <MenuNavegacao 
        onVoltarTrilha={onVoltarTrilha}
        onVoltarMenu={onVoltarMenu}
        onAbrirRanking={onAbrirRanking}
        posicao="top-right"
      />

      {/* Imagem em tela cheia */}
      <div className="w-full h-screen flex items-center justify-center relative">
        {imagens.length > 0 ? (
          <img
            src={imagens[imagemAtual]}
            alt={`História da Matemática - Slide ${imagemAtual + 1}`}
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
            <p className="text-xl">Nenhuma imagem foi encontrada na pasta HistoriaMatematica</p>
          </div>
        )}
      </div>

      {/* Botão para ir direto ao JogoMatematica (Debug/Teste) */}
      {/* <button */}
      {/*   onClick={() => setMostrarJogoMatematica(true)} */}
      {/*   className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 z-30 flex items-center gap-2" */}
      {/*   style={{ */}
      {/*     fontSize: 'clamp(14px, 2vw, 18px)' */}
      {/*   }} */}
      {/* > */}
      {/*   <span>🎮</span> */}
      {/*   <span>Ir para Caça-Palavras</span> */}
      {/* </button> */}

      {/* Botão Anterior - Extremo esquerdo */}
      <button
        onClick={imagemAnterior}
        disabled={imagens.length === 0 || imagemAtual === 0}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-transparent hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-20 flex items-center justify-center"
        style={{
          width: 'min(100px, 12vw)',
          height: 'min(100px, 12vw)'
        }}
      >
        <img 
          src={arrowLeftCircle} 
          alt="Seta anterior" 
          className="w-full h-full object-contain transform scale-x-[-1]"
        />
      </button>

      {/* Botão Próximo - Extremo direito */}
      <button
        onClick={proximaImagem}
        disabled={imagens.length === 0 || !podeNavegar}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-transparent hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-20 flex items-center justify-center"
        style={{
          width: 'min(100px, 12vw)',
          height: 'min(100px, 12vw)'
        }}
      >
        <img 
          src={arrowLeftCircle} 
          alt="Seta próxima" 
          className="w-full h-full object-contain"
        />
      </button>
    </main>
  );
};

export default TelaJogoMatematica;
