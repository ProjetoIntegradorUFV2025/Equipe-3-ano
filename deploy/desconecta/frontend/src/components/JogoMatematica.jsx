import React, { useState, useEffect } from 'react';

import MenuNavegacao from './ui/MenuNavegacao';

// Importar imagem de fundo
import fundoMatematica from '../assets/HistoriaMatematica/Sprites_Caca_Palavras_Matematica/Background.png';

// Importar letreiro e fundo caça palavras
import fraseCacaPalavra from '../assets/HistoriaMatematica/Sprites_Caca_Palavras_Matematica/Matematica_Caca_Palavra_Cabecalho.png';
import letreiroCacaPalavras from '../assets/HistoriaMatematica/Sprites_Caca_Palavras_Matematica/LetreiroCaça-palavras.svg';

// Importar imagens do jogo
import pontuacaoCacaPalavras from '../assets/HistoriaMatematica/Sprites_Caca_Palavras_Matematica/PontuacaoCacaPalavras.png';
import botaoConfirmar from '../assets/HistoriaCiencia/JogoCiencia/Botao-confirma.png';
import popupErro from '../assets/HistoriaMatematica/Sprites_Caca_Palavras_Matematica/PopUpErro.png';

// Importar componente de pontuação
import TelaPontuacao from './TelaPontuacao';

// --- Componente: Jogo Matemática ---
const JogoMatematica = ({ onVoltarTrilha, onVoltarMenu, onConcluido, onAbrirRanking }) => {
  const [palavrasEncontradas, setPalavrasEncontradas] = useState(0);
  const totalPalavras = 4; // QUADRADO, RETANGULO, TRIANGULO, CIRCULO
  const [botoesClicados, setBotoesClicados] = useState(new Set());
  const [botoesCorretos, setBotoesCorretos] = useState(new Set()); // Botões com resposta correta
  const [stringIndices, setStringIndices] = useState('');
  const [mostrarPopupErro, setMostrarPopupErro] = useState(false);
  const [jogoCompleto, setJogoCompleto] = useState(false);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [numeroErros, setNumeroErros] = useState(0); // Contador de erros
  const [mostrarPopupInicial, setMostrarPopupInicial] = useState(true);
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

  // useEffect para iniciar o temporizador quando o componente for montado
  useEffect(() => {
    setTempoInicio(Date.now());
    
    const timer = setInterval(() => {
      setTempoDecorrido(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fechar popup inicial automaticamente após 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarPopupInicial(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    // Função auxiliar para definir palavra a partir de índices
    const definirPalavrasPorIndices = (indices, palavra) => {
      const indicesArray = indices.split('/').map(Number);
      const letras = palavra.split('');
      
      indicesArray.forEach((indice, i) => {
        if (i < letras.length) {
          definirLetra(indice, letras[i]);
        }
      });
    };

    // Palavras de Matemática (Formas Geométricas)
    // QUADRADO: índices 30/42/54/66/78/90/102/114
    definirPalavrasPorIndices('30/42/54/66/78/90/102/114', 'QUADRADO');
    
    // RETANGULO: índices 10/22/34/46/58/70/82/94/106
    definirPalavrasPorIndices('10/22/34/46/58/70/82/94/106', 'RETANGULO');
    
    // TRIANGULO: índices 12/13/14/15/16/17/18/19/20
    definirPalavrasPorIndices('12/13/14/15/16/17/18/19/20', 'TRIANGULO');
    
    // CIRCULO: índices 137/138/139/140/141/142/143
    definirPalavrasPorIndices('137/138/139/140/141/142/143', 'CIRCULO');
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
    // Se o botão está correto (azul), não permite alteração
    if (botoesCorretos.has(index)) {
      return;
    }

    const novosBotoesClicados = new Set(botoesClicados);
    
    if (botoesClicados.has(index)) {
      // Se já foi clicado, remove da seleção
      novosBotoesClicados.delete(index);
    } else {
      // Se não foi clicado, adiciona à seleção
      novosBotoesClicados.add(index);
    }
    
    // Reconstroi a string sempre de forma ordenada
    const indicesOrdenados = Array.from(novosBotoesClicados).sort((a, b) => a - b);
    const novaStringOrdenada = indicesOrdenados.join('/');
    
    setBotoesClicados(novosBotoesClicados);
    setStringIndices(novaStringOrdenada);
    
    // console.log(`Botão ${index} ${botoesClicados.has(index) ? 'desmarcado' : 'marcado'}`);
    // console.log(`Total selecionados: ${novosBotoesClicados.size}`);
    // console.log(`String ordenada: ${novaStringOrdenada}`);
  };

  // Função para verificar resposta na API
  const verificarResposta = async () => {
    if (stringIndices === '') return;

    try {
      // console.log('Enviando string de índices para a API:', stringIndices);

      const params = new URLSearchParams();
      params.append('tipoDesafio', 'JogoPalavras');
      params.append('id', '2'); // ID do Caça-Palavras de Matemática
      params.append('tentativa', stringIndices); // Enviando a string de índices

      // const response = await fetch('http://localhost:8080/api/desafio/verificar', {
      const response = await fetch(`${window.location.origin}/desconecta/api/desafio/verificar`, {
        method: 'POST',
        body: params,
      });
      
      const resultado = await response.text();
      // console.log('Resposta da API:', resultado);

      if (resultado === 'True') {
        // Resposta correta - transformar botões vermelhos em azuis e bloquear
        const novosBotoesCorretos = new Set(botoesCorretos);
        botoesClicados.forEach(index => {
          novosBotoesCorretos.add(index);
        });
        setBotoesCorretos(novosBotoesCorretos);
        
        // Incrementar palavras encontradas
        setPalavrasEncontradas(prev => {
          const novaQuantidade = prev + 1;
          
          // Verificar se completou todas as palavras
          if (novaQuantidade >= totalPalavras) {
            // console.log('Jogo completo! Salvando pontuação e redirecionando...');
            
            setTimeout(async () => {
              // Calcular tempo final em segundos
              const tempoFinal = tempoDecorrido;
              
              try {
                const alunoId = localStorage.getItem('alunoId');
                
                if (alunoId) {
                  // PRIMEIRO: Verificar se o desafio já foi concluído
                  // console.log('🔍 Verificando se desafio já foi concluído...');
                  const responseVerificar = await fetch(
                    // `http://localhost:8080/api/desafio/verificarConcluido?pkAluno=${alunoId}&nomeIlha=MATEMATICA`
                    `${window.location.origin}/desconecta/api/desafio/verificarConcluido?pkAluno=${alunoId}&nomeIlha=MATEMATICA`
                  );
                  
                  if (!responseVerificar.ok) {
                    throw new Error('Erro ao verificar status do desafio');
                  }
                  
                  const desafioConcluido = await responseVerificar.json();
                  // console.log('Status do desafio:', desafioConcluido ? '✅ Já concluído' : '⏳ Não concluído');
                  
                  let pontuacaoCalculada = 0;
                  
                  // SEGUNDO: Salvar pontuação APENAS se o desafio NÃO foi concluído
                  if (!desafioConcluido) {
                    // console.log('💾 Salvando pontuação (primeira vez)...');
                    const responsePontuacao = await fetch(
                      // `http://localhost:8080/api/desafio/salvarPontuacao?pkAluno=${alunoId}&nomeIlha=MATEMATICA&tempo=${tempoFinal}&numErros=${numeroErros}`,
                      `${window.location.origin}/desconecta/api/desafio/salvarPontuacao?pkAluno=${alunoId}&nomeIlha=MATEMATICA&tempo=${tempoFinal}&numErros=${numeroErros}`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      }
                    );
                    
                    if (responsePontuacao.ok) {
                      pontuacaoCalculada = await responsePontuacao.json();
                      // console.log('✅ Pontuação calculada e salva:', pontuacaoCalculada);

                      // Calcular pontuação total do aluno
                      const apelidoAluno = localStorage.getItem('apelidoAluno');
                      if (apelidoAluno) {
                        const paramsCalculo = new URLSearchParams();
                        paramsCalculo.append('apelidoAluno', apelidoAluno);
                        // await fetch('http://localhost:8080/api/progresso-aluno/calcularPontuacaoTotal', {
                        await fetch(`${window.location.origin}/desconecta/api/progresso-aluno/calcularPontuacaoTotal`, {
                          method: 'POST',
                          body: paramsCalculo
                        });
                      }
                    } else {
                      console.error('❌ Erro ao salvar pontuação. Status:', responsePontuacao.status);
                      const errorText = await responsePontuacao.text();
                      console.error('Resposta do servidor:', errorText);
                      
                      if (errorText === '-2') {
                        // console.log('⚠️ Desafio já estava concluído (código -2)');
                        pontuacaoCalculada = 1000 - (tempoFinal * 2) - (numeroErros * 50);
                        pontuacaoCalculada = Math.max(pontuacaoCalculada, 0);
                      }
                    }
                  } else {
                    // console.log('⚠️ Desafio já foi concluído anteriormente. Pontuação NÃO será salva.');
                    // console.log('Calculando pontuação apenas para exibição...');
                    pontuacaoCalculada = 1000 - (tempoFinal * 2) - (numeroErros * 50);
                    pontuacaoCalculada = Math.max(pontuacaoCalculada, 0);
                  }
                  
                  // Armazenar dados para a TelaPontuacao
                  sessionStorage.setItem('dadosPontuacao', JSON.stringify({
                    tempo: tempoFinal,
                    tentativas: numeroErros,
                    pontos: pontuacaoCalculada,
                    jaFoiConcluido: desafioConcluido
                  }));
                }
              } catch (error) {
                console.error('❌ Erro ao processar conclusão do jogo:', error);
              }
              
              if (onConcluido) {
                onConcluido();
              } else {
                setJogoCompleto(true);
              }
            }, 1500);
          }
          
          return novaQuantidade;
        });
        
        // console.log('Resposta correta! Botões bloqueados e marcados como corretos.');
      } else {
        // Resposta incorreta - mostrar popup de erro
        // console.log('Resposta incorreta! Mostrando popup de erro.');
        setNumeroErros(prev => prev + 1);
        
        setMostrarPopupErro(true);
        
        setTimeout(() => {
          setMostrarPopupErro(false);
        }, 2000);
      }

      // Em ambos os casos, limpar seleção atual e string
      setBotoesClicados(new Set());
      setStringIndices('');

    } catch (error) {
      console.error('Erro ao verificar resposta:', error);
      // Em caso de erro, também limpar
      setBotoesClicados(new Set());
      setStringIndices('');
    }
  };

  // Função para fechar popup de erro
  const fecharPopupErro = () => {
    setMostrarPopupErro(false);
  };

  // Se jogo completo, redirecionar usando onConcluido
  if (jogoCompleto) {
    if (onConcluido) {
      onConcluido();
      return null;
    }
    // Fallback: se não houver onConcluido, mostrar TelaPontuacao diretamente
    return <TelaPontuacao 
      onVoltarTrilha={onVoltarTrilha} 
      onVoltarMenu={onVoltarMenu}
      onAbrirRanking={onAbrirRanking}
      ilhaCompletada={2} 
      nomeIlhaJogada="MATEMATICA" 
    />;
  }

  return (
    <main 
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${fundoMatematica})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

    <div className="flex flex-col items-center justify-between" style={{ height: '95vh' }}>

      {/* Menu de Navegação Reutilizável */}
      <MenuNavegacao 
        onVoltarTrilha={onVoltarTrilha}
        onVoltarMenu={onVoltarMenu}
        onAbrirRanking={onAbrirRanking}
        posicao="top-right"
        tipoTutorial="caca-palavras"
      />


     <div className="flex flex-col items-center" style={{ gap: '3vh' }}>
    <img 
      src={letreiroCacaPalavras} 
      alt="Letreiro Caça Palavras"
      className="w-[25vw] sm:w-[28vw] md:w-[30vw] lg:w-[32vw] xl:w-[34vw]"
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
      }}
    />

    <img 
      src={fraseCacaPalavra} 
      alt="Fundo Caça Palavras"
      className="w-[35vw] sm:w-[38vw] md:w-[42vw] lg:w-[46vw] xl:w-[48vw]"
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
      }}
    />
  </div>

      {/* Matriz de Caça Palavras 12x12 Centralizada */}
      <div className="w-full h-screen flex justify-center items-center transform scale-y-90" style={{height:"80vh"}}>
        
        {/* Matriz 12x12 de Botões - Centralizada e Aumentada */}
        <div className="grid grid-cols-12 gap-0 p-0 bg-black rounded-2xl shadow-xl border-4 border-black overflow-hidden">
          {Array.from({ length: 144 }, (_, index) => (
            <button
              key={index}
              onClick={() => handleBotaoClick(index)}
              className={`w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-base transition-colors duration-200 relative ${
                botoesCorretos.has(index) 
                  ? 'cursor-not-allowed opacity-90' 
                  : 'hover:bg-gray-100 cursor-pointer'
              }`}
              style={{
                minWidth: '40px',
                minHeight: '40px',
                margin: '1px',
                borderRadius: '0'
              }}
            >
              {letrasMatriz[index] || 'A'}
              
              {/* Máscara azul clara para botões corretos */}
              {botoesCorretos.has(index) && (
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    backgroundColor: '#60a0b5', // Cor personalizada azul
                    opacity: 0.7,
                    pointerEvents: 'none'
                  }}
                />
              )}
              
              {/* Máscara vermelha translúcida para botões selecionados (apenas se não estiver correto) */}
              {botoesClicados.has(index) && !botoesCorretos.has(index) && (
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

      {/* Painel de Pontuação - Lado direito da tela */}
      <div 
        className="fixed right-4 top-1/2 transform -translate-y-1/2"
        style={{
          backgroundImage: `url(${pontuacaoCacaPalavras})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '220px',
          height: '160px'
        }}
      >
        {/* Texto de pontuação */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-7xl font-bold" style={{ color: '#257894' }}>
            {palavrasEncontradas}/{totalPalavras}
          </div>
        </div>
      </div>

      {/* Componente Debug - Índices Selecionados */}
      {/* <div className="fixed left-4 bottom-4 bg-black bg-opacity-80 text-white p-4 rounded-lg shadow-2xl max-w-md z-30 border-2 border-blue-500"> */}
      {/*   <h3 className="text-sm font-bold mb-2 text-blue-300">📊 Debug - Índices Selecionados:</h3> */}
      {/*   <div className="bg-gray-900 p-3 rounded border border-blue-400"> */}
      {/*     <p className="text-lg font-mono break-words text-green-400"> */}
      {/*       {stringIndices || 'Nenhum botão selecionado'} */}
      {/*     </p> */}
      {/*   </div> */}
      {/*   <div className="mt-2 flex justify-between items-center text-xs text-gray-400"> */}
      {/*     <span>Total: {botoesClicados.size} botões</span> */}
      {/*     <span>Formato: índice/índice/...</span> */}
      {/*   </div> */}
      {/*   <div className="mt-2 text-xs text-yellow-300"> */}
      {/*     💡 Copie esta string para usar no SQL! */}
      {/*   </div> */}
      {/* </div> */}
      {/**/}
      {/* Botão Confirmar - Canto inferior direito */}
      <button
        onClick={verificarResposta}
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
            maxWidth: '85%',
            height: 'auto',
            filter: stringIndices === '' ? 'grayscale(100%) brightness(0.5)' : 'none'
          }}
        />
      </button>

      {/* Popup de Erro */}
      {mostrarPopupErro && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={fecharPopupErro}
        >
          <div className="relative">
            <img 
              src={popupErro}
              alt="Popup de Erro"
              className="object-contain cursor-pointer"
              onClick={fecharPopupErro}
              style={{
                maxWidth: '700px',
                maxHeight: '650px',
                width: 'auto',
                height: 'auto',
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
        </div>
      )}

      {/* Popup Inicial - Frase Caça Palavra */}
      {mostrarPopupInicial && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
          onClick={() => setMostrarPopupInicial(false)}
        >
          <div className="text-center">
            <img 
              src={fraseCacaPalavra}
              alt="Caça Palavras"
              className="w-[90vw] max-w-5xl"
              style={{
                filter: "drop-shadow(0 0 30px rgba(96, 160, 181, 0.8)) drop-shadow(0 0 60px rgba(96, 160, 181, 0.6))"
              }}
            />
            <p className="text-white text-3xl mt-8 opacity-75">
              Clique para começar
            </p>
          </div>
        </div>
      )}
    </div>
    </main>
  );
};

export default JogoMatematica;
