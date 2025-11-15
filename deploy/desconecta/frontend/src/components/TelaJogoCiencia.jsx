import React, { useState, useEffect } from 'react';
import MenuNavegacao from './ui/MenuNavegacao';
import TelaPontuacao from './TelaPontuacao';
import ConectaCiencia from './ConectaCiencia';

// Importar imagem da seta
import arrowLeftCircle from '../assets/Arrow - Left Circle.png';

// Importar todas as imagens estaticamente da pasta HistoriaCiencia
import img1 from '../assets/HistoriaCiencia/Quadro_1_Ciencias.gif';
import img2 from '../assets/HistoriaCiencia/Quadro_2_Ciencias.gif';
import img3 from '../assets/HistoriaCiencia/Quadro_3_Ciencias.gif';
import img4 from '../assets/HistoriaCiencia/Quadro_4_Ciencias.gif';
import img5 from '../assets/HistoriaCiencia/Quadro_5_Ciencias.gif';
import img6 from '../assets/HistoriaCiencia/Quadro_6_Ciencias.gif';
import img7 from '../assets/HistoriaCiencia/Quadro_7_Ciencias.gif';
import img8 from '../assets/HistoriaCiencia/Quadro_8_Ciencias.gif';
import img9 from '../assets/HistoriaCiencia/Quadro_9_Ciencias.gif';
import img10 from '../assets/HistoriaCiencia/Quadro_10_Ciencias.gif';
import img11 from '../assets/HistoriaCiencia/Quadro_11_Ciencias.gif';
import img12 from '../assets/HistoriaCiencia/Quadro_12_Ciencias.gif';
import img13 from '../assets/HistoriaCiencia/Quadro_13_Ciencias.gif';
import img14 from '../assets/HistoriaCiencia/Quadro_14_Ciencias.gif';
import img15 from '../assets/HistoriaCiencia/Quadro_15_Ciencias.gif';
import img16 from '../assets/HistoriaCiencia/Quadro_16_Ciencias.gif';
import img17 from '../assets/HistoriaCiencia/Quadro_17_Ciencias.gif';
import img18 from '../assets/HistoriaCiencia/Quadro_18_Ciencias.gif';
import img19 from '../assets/HistoriaCiencia/Quadro_19_Ciencias.gif';
import img20 from '../assets/HistoriaCiencia/Quadro_20_Ciencias.gif';
import img21 from '../assets/HistoriaCiencia/Quadro_21_Ciencias.gif';
import img22 from '../assets/HistoriaCiencia/Quadro_22_Ciencias.gif';
import img23 from '../assets/HistoriaCiencia/Quadro_23_Ciencias.gif';
import img24 from '../assets/HistoriaCiencia/Quadro_24_Ciencias.gif';
import img25 from '../assets/HistoriaCiencia/Quadro_25_Ciencias.gif';
import img26 from '../assets/HistoriaCiencia/Quadro_26_Ciencias.gif';
import img27 from '../assets/HistoriaCiencia/Quadro_27_Ciencias.gif';

// Array com todas as imagens em ordem (filtra apenas as que foram importadas com sucesso)
const imagens = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27
].filter(img => img !== undefined);

// --- Componente: Tela Jogo Ciência ---
const TelaJogoCiencia = ({ onVoltarTrilha, onVoltarMenu, onAbrirRanking }) => {
  const [imagemAtual, setImagemAtual] = useState(0);
  const [podeNavegar, setPodeNavegar] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [mostrarPontuacao, setMostrarPontuacao] = useState(false);
  const [mostrarConectaCiencia, setMostrarConectaCiencia] = useState(false);
  const [jogoCienciaConcluido, setJogoCienciaConcluido] = useState(false);

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
      // Se estamos na imagem 24 (índice 23), ir para ConectaCiencia
      if (imagemAtual === 23) {
        setMostrarConectaCiencia(true);
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
    // Permite voltar em todas as imagens, EXCETO na imagem 25 (índice 24)
    // que é a imagem imediatamente após o jogo ConectaCiencia
    if (imagemAtual > 0 && imagemAtual !== 24) {
      setImagemAtual(prev => prev - 1);
      // Não inicia timer para voltar - deixa livre
    }
  };

  const irParaConectaCiencia = () => {
    setMostrarConectaCiencia(true);
  };

  // Se deve mostrar a tela ConectaCiencia, renderizar ConectaCiencia
  if (mostrarConectaCiencia) {
    return (
      <ConectaCiencia 
        onVoltarTrilha={onVoltarTrilha} 
        onVoltarMenu={onVoltarMenu}
        onAbrirRanking={onAbrirRanking}
        onConcluido={() => {
          // Após concluir o jogo, voltar para img25 (índice 24)
          setImagemAtual(24);
          setMostrarConectaCiencia(false);
          setJogoCienciaConcluido(true);
        }}
      />
    );
  }

  // Se deve mostrar a tela de pontuação, renderizar TelaPontuacao
  if (mostrarPontuacao) {
    // Ciências corresponde ao enum posição 1 (0=DADOLANDIA, 1=CIENCIAS, 2=MATEMATICA, 3=GEOGRAFIA, 4=HISTORIA)
    return <TelaPontuacao 
      onVoltarTrilha={onVoltarTrilha} 
      onVoltarMenu={onVoltarMenu}
      onAbrirRanking={onAbrirRanking}
      ilhaCompletada={1} 
      nomeIlhaJogada="CIENCIAS" 
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
      {/* Desabilitado apenas na imagem 25 (índice 24) - imediatamente após o jogo */}
      <button
        onClick={imagemAnterior}
        disabled={imagens.length === 0 || imagemAtual === 0 || imagemAtual === 24}
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

      {/* Botão para ir direto ao Conecta Ciência */}
      {/* <button */}
      {/*   onClick={irParaConectaCiencia} */}
      {/*   className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-20 flex items-center gap-3" */}
      {/* > */}
      {/*   <span className="text-lg">🧪</span> */}
      {/*   <span className="text-xl">Ir para Conecta Ciência</span> */}
      {/*   <span className="text-lg">🔬</span> */}
      {/* </button> */}
    </main>
  );
};

export default TelaJogoCiencia;
