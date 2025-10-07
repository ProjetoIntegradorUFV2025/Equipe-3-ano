
import React, { useState, useEffect } from 'react'; // Adicionar useEffect

import MenuNavegacao from './ui/MenuNavegacao';

// Importar imagem de fundo
import fundoGeografia from '../assets/HistoriaGeografia/JogoGeografia/Background.png';

// Importar letreiro e fundo caça palavras
import fundoCacaPalavra from '../assets/HistoriaGeografia/JogoGeografia/FraseCacaPalavrasGeografia.png';
import letreiroCacaPalavras from '../assets/HistoriaGeografia/JogoGeografia/LetreiroCacaPalavras.png';

// Importar imagens do jogo
import pontuacaoCacaPalavras from '../assets/HistoriaGeografia/JogoGeografia/PontuacaoCacaPalavras.png';
import botaoConfirmar from '../assets/HistoriaCiencia/JogoCiencia/Botao-confirma.png';

// --- Componente: Jogo Geografia ---
const JogoGeografia = ({ onVoltarTrilha, onVoltarMenu }) => {
  const [palavrasEncontradas, setPalavrasEncontradas] = useState(0);
  const totalPalavras = 5;
  const [botoesClicados, setBotoesClicados] = useState(new Set());
  const [stringIndices, setStringIndices] = useState('');
  const [letrasMatriz, setLetrasMatriz] = useState(() => {
    // Inicializa a matriz com letras aleatórias
    return Array(144).fill().map(() => {
      const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return letras[Math.floor(Math.random() * letras.length)];
    });
  });

  // Função para definir uma letra específica em uma posição
  const definirLetra = (indice, letra) => {
    if (indice >= 0 && indice < 144) {
      setLetrasMatriz(prev => {
        const novaMatriz = [...prev];
        novaMatriz[indice] = letra.toUpperCase();
        return novaMatriz;
      });
    }
  };

  const definirLetraPorCoordenada = (linha, coluna, letra) => {
    if (linha >= 0 && linha < 12 && coluna >= 0 && coluna < 12) {
      const indice = linha * 12 + coluna;
      definirLetra(indice, letra);
    }
  };

  
  useEffect(() => {
    // Suas instruções aqui - executam quando a tela carrega
    definirLetraPorCoordenada(1, 5, 'B');
    definirLetraPorCoordenada(2, 5, 'R');
    definirLetraPorCoordenada(3, 5, 'A');
    definirLetraPorCoordenada(4, 5, 'S');
    definirLetraPorCoordenada(5, 5, 'I');
    definirLetraPorCoordenada(6, 5, 'L');
    
    // Exemplo: inserir "MUNDO" verticalmente
    definirLetraPorCoordenada(0, 2, 'F');
    definirLetraPorCoordenada(0, 3, 'L');
    definirLetraPorCoordenada(0, 4, 'O');
    definirLetraPorCoordenada(0, 5, 'R');
    definirLetraPorCoordenada(0, 6, 'E');
    definirLetraPorCoordenada(0, 7, 'S');
    definirLetraPorCoordenada(0, 8, 'T');
    definirLetraPorCoordenada(0, 9, 'A');
    definirLetraPorCoordenada(0, 10, 'L');

    definirLetraPorCoordenada(4, 0, 'G');
    definirLetraPorCoordenada(4, 1, 'O');
    definirLetraPorCoordenada(4, 2, 'I');
    definirLetraPorCoordenada(4, 3, 'A');
    definirLetraPorCoordenada(4, 4, 'S');

    definirLetraPorCoordenada(8, 1, 'A');
    definirLetraPorCoordenada(8, 2, 'L');
    definirLetraPorCoordenada(8, 3, 'E');
    definirLetraPorCoordenada(8, 4, 'C');
    definirLetraPorCoordenada(8, 5, 'R');
    definirLetraPorCoordenada(8, 6, 'I');
    definirLetraPorCoordenada(8, 7, 'M');

    definirLetraPorCoordenada(9, 1, 'P');
    definirLetraPorCoordenada(9, 2, 'A');
    definirLetraPorCoordenada(9, 3, 'L');
    definirLetraPorCoordenada(9, 4, 'M');
    definirLetraPorCoordenada(9, 5, 'E');
    definirLetraPorCoordenada(9, 6, 'I');
    definirLetraPorCoordenada(9, 7, 'R');
    definirLetraPorCoordenada(9, 8, 'A');
    definirLetraPorCoordenada(9, 9, 'S');


    
  }, []); // Array vazio [] significa que executa apenas uma vez ao carregar


  // Função para preencher posições aleatórias
  const preencherAleatorio = () => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setLetrasMatriz(prev => 
      prev.map(() => letras[Math.floor(Math.random() * letras.length)])
    );
  };

  // Função para lidar com cliques nos botões
  const handleBotaoClick = (index) => {
    const novosBotoesClicados = new Set(botoesClicados);
    
    if (botoesClicados.has(index)) {
      // Se já foi clicado, remove da seleção
      novosBotoesClicados.delete(index);
      
      // Remove o índice da string (remove o número e a vírgula associada)
      let novaString = stringIndices;
      if (novaString.includes(`,${index},`)) {
        // Remove do meio da string
        novaString = novaString.replace(`,${index},`, ',');
      } else if (novaString.startsWith(`${index},`)) {
        // Remove do início da string
        novaString = novaString.replace(`${index},`, '');
      } else if (novaString.endsWith(`,${index}`)) {
        // Remove do final da string
        novaString = novaString.replace(`,${index}`, '');
      } else if (novaString === `${index}`) {
        // É o único elemento
        novaString = '';
      }
      setStringIndices(novaString);
    } else {
      // Se não foi clicado, adiciona à seleção
      novosBotoesClicados.add(index);
      
      // Adiciona o índice à string
      if (stringIndices === '') {
        setStringIndices(`${index}`);
      } else {
        setStringIndices(prev => `${prev},${index}`);
      }
    }
    
    setBotoesClicados(novosBotoesClicados);
    console.log(`Botão ${index} ${botoesClicados.has(index) ? 'desmarcado' : 'marcado'}`);
    console.log(`Total selecionados: ${novosBotoesClicados.size}`);
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden w-full"
      style={{
        backgroundImage: `url(${fundoGeografia})`,
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

      {/* Letreiro e Fundo Caça Palavras */}
      <div className="absolute top-16 transform scale-y-90 sm:top-20 md:top-24 lg:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 px-4">
        {/* Letreiro Caça Palavras */}
        <div className="mb-3">
          <img 
            src={letreiroCacaPalavras} 
            alt="Letreiro Caça Palavras"
            className="max-w-full w-44 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}
          />
        </div>

        {/* Fundo Caça Palavras */}
        <div>
          <img 
            src={fundoCacaPalavra} 
            alt="Fundo Caça Palavras"
            className="max-w-full h-auto object-contain w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem]"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }}
          />
        </div>
      </div>

      {/* Matriz de Caça Palavras 12x12 Centralizada */}
      <div className="w-full h-screen pt-6 flex justify-center items-center translate-y-12">
        
        {/* Matriz 12x12 de Botões - Centralizada e Aumentada */}
        <div className="grid grid-cols-12 gap-0 p-0 bg-black rounded-2xl shadow-xl border-4 border-black overflow-hidden">
          {Array.from({ length: 144 }, (_, index) => (
            <button
              key={index}
              onClick={() => handleBotaoClick(index)}
              className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-base hover:bg-gray-100 transition-colors duration-200 relative"
              style={{
                minWidth: '40px',
                minHeight: '40px',
                margin: '1px',
                borderRadius: '0'
              }}
            >
              {letrasMatriz[index] || 'A'}
              {/* Máscara vermelha translúcida para botões selecionados */}
              {botoesClicados.has(index) && (
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.5)', // Vermelho translúcido
                    pointerEvents: 'none'
                  }}
                />
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Debug Visual - String de índices no canto esquerdo */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-xs">
        <h3 className="text-sm font-bold mb-2">Debug - Índices:</h3>
        <p className="text-xs break-words">
          {stringIndices || 'Nenhum botão selecionado'}
        </p>
        <p className="text-xs mt-2 text-gray-300">
          Total: {botoesClicados.size} botões
        </p>
      </div>

      {/* Painel de Pontuação - Lado direito da tela */}
      <div 
        className="fixed right-4 top-1/2 transform -translate-y-1/2"
        style={{
          backgroundImage: `url(${pontuacaoCacaPalavras})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '180px',
          height: '130px'
        }}
      >
        {/* Texto de pontuação */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-3xl font-bold" style={{ color: '#257894' }}>
            {palavrasEncontradas}/{totalPalavras}
          </div>
        </div>
      </div>

      {/* Botão Confirmar - Canto inferior direito */}
      <button
        onClick={() => {
          if (stringIndices === '') return;
          // Lógica de confirmação será implementada
          console.log('Botão confirmar clicado com string:', stringIndices);
        }}
        disabled={stringIndices === ''}
        className={`fixed bottom-8 right-8 bg-transparent border-none p-0 transition-all duration-300 transform hover:scale-105 active:scale-95 z-20 ${
          stringIndices === '' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{ 
          outline: 'none'
        }}
      >
        <img 
          src={botaoConfirmar}
          alt="Confirmar Resposta"
          className="w-auto h-auto object-contain"
          style={{
            maxWidth: '80px',
            height: 'auto',
            filter: stringIndices === '' ? 'grayscale(100%) brightness(0.5)' : 'none'
          }}
        />
      </button>
    </main>
  );
};

export default JogoGeografia;