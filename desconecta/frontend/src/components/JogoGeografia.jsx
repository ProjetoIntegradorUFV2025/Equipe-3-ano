
import React, { useState, useEffect } from 'react'; // Adicionar useEffect

import MenuNavegacao from './ui/MenuNavegacao';

// Importar imagem de fundo
import fundoGeografia from '../assets/HistoriaGeografia/JogoGeografia/Background.png';

// Importar letreiro e fundo caça palavras
import fraseCacaPalavra from '../assets/HistoriaGeografia/JogoGeografia/FraseCacaPalavrasGeografia.png';
import letreiroCacaPalavras from '../assets/HistoriaGeografia/JogoGeografia/LetreiroCacaPalavras.png';

// Importar imagens do jogo
import pontuacaoCacaPalavras from '../assets/HistoriaGeografia/JogoGeografia/PontuacaoCacaPalavras.png';
import botaoConfirmar from '../assets/HistoriaCiencia/JogoCiencia/Botao-confirma.png';
import popupErro from '../assets/HistoriaGeografia/JogoGeografia/PopUpErro.png';

// Importar componente de pontuação
import TelaPontuacao from './TelaPontuacao';

// --- Componente: Jogo Geografia ---
const JogoGeografia = ({ onVoltarTrilha, onVoltarMenu, onConcluido }) => {
  const [palavrasEncontradas, setPalavrasEncontradas] = useState(0);
  const totalPalavras = 5;
  const [botoesClicados, setBotoesClicados] = useState(new Set());
  const [botoesCorretos, setBotoesCorretos] = useState(new Set()); // Botões com resposta correta
  const [stringIndices, setStringIndices] = useState('');
  const [mostrarPopupErro, setMostrarPopupErro] = useState(false);
  const [jogoCompleto, setJogoCompleto] = useState(false);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [numeroErros, setNumeroErros] = useState(0); // Contador de erros
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
    
    console.log(`Botão ${index} ${botoesClicados.has(index) ? 'desmarcado' : 'marcado'}`);
    console.log(`Total selecionados: ${novosBotoesClicados.size}`);
    console.log(`String ordenada: ${novaStringOrdenada}`);
  };

  // Função para verificar resposta na API
  const verificarResposta = async () => {
    if (stringIndices === '') return;

    try {
      console.log('Enviando requisição para API com:', stringIndices);
      
      const response = await fetch(
        `http://localhost:8080/api/cacaPalavras/verificarAgrupamento/1?tentativa=${stringIndices}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const resultado = await response.text();
      console.log('Resposta da API:', resultado);

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
            console.log('Jogo completo! Salvando pontuação e redirecionando...');
            
            setTimeout(async () => {
              // Calcular tempo final em segundos
              const tempoFinal = tempoDecorrido;
              
              try {
                const alunoId = localStorage.getItem('alunoId');
                
                if (alunoId) {
                  // PRIMEIRO: Verificar se o desafio já foi concluído
                  console.log('🔍 Verificando se desafio já foi concluído...');
                  const responseVerificar = await fetch(
                    `http://localhost:8080/api/desafio/verificarConcluido?pkAluno=${alunoId}&nomeIlha=GEOGRAFIA`
                  );
                  
                  if (!responseVerificar.ok) {
                    throw new Error('Erro ao verificar status do desafio');
                  }
                  
                  const desafioConcluido = await responseVerificar.json();
                  console.log('Status do desafio:', desafioConcluido ? '✅ Já concluído' : '⏳ Não concluído');
                  
                  let pontuacaoCalculada = 0;
                  
                  // SEGUNDO: Salvar pontuação APENAS se o desafio NÃO foi concluído
                  if (!desafioConcluido) {
                    console.log('💾 Salvando pontuação (primeira vez)...');
                    const responsePontuacao = await fetch(
                      `http://localhost:8080/api/desafio/salvarPontuacao?pkAluno=${alunoId}&nomeIlha=GEOGRAFIA&tempo=${tempoFinal}&numErros=${numeroErros}`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      }
                    );
                    
                    if (responsePontuacao.ok) {
                      pontuacaoCalculada = await responsePontuacao.json();
                      console.log('✅ Pontuação calculada e salva:', pontuacaoCalculada);
                    } else {
                      console.error('❌ Erro ao salvar pontuação. Status:', responsePontuacao.status);
                      const errorText = await responsePontuacao.text();
                      console.error('Resposta do servidor:', errorText);
                      
                      // Se erro for -2 (já concluído), calcular pontuação localmente para exibir
                      if (errorText === '-2') {
                        console.log('⚠️ Desafio já estava concluído (código -2)');
                        pontuacaoCalculada = 1000 - (tempoFinal * 2) - (numeroErros * 50);
                        pontuacaoCalculada = Math.max(pontuacaoCalculada, 0);
                      }
                    }
                  } else {
                    console.log('⚠️ Desafio já foi concluído anteriormente. Pontuação NÃO será salva.');
                    console.log('Calculando pontuação apenas para exibição...');
                    // Calcular pontuação localmente apenas para exibir
                    pontuacaoCalculada = 1000 - (tempoFinal * 2) - (numeroErros * 50);
                    pontuacaoCalculada = Math.max(pontuacaoCalculada, 0);
                  }
                  
                  // Armazenar dados para a TelaPontuacao
                  sessionStorage.setItem('dadosPontuacao', JSON.stringify({
                    tempo: tempoFinal,
                    tentativas: numeroErros, // Agora usa o número real de erros
                    pontos: pontuacaoCalculada,
                    jaFoiConcluido: desafioConcluido // Flag para indicar se já estava concluído
                  }));
                }
              } catch (error) {
                console.error('❌ Erro ao processar conclusão do jogo:', error);
              }
              
              // Se existe callback onConcluido, usa ele (vindo da TelaJogoGeografia)
              // Caso contrário, vai para tela de pontuação (modo standalone)
              if (onConcluido) {
                onConcluido();
              } else {
                setJogoCompleto(true);
              }
            }, 1500); // Aguarda 1.5 segundos antes de processar
          }
          
          return novaQuantidade;
        });
        
        console.log('Resposta correta! Botões bloqueados e marcados como corretos.');
      } else {
        // Resposta incorreta - mostrar popup de erro
        console.log('Resposta incorreta! Mostrando popup de erro.');
        // Incrementar contador de erros
        setNumeroErros(prev => prev + 1);
        
        setMostrarPopupErro(true);
        
        // Auto-esconder popup após 2 segundos (mesmo tempo do ConectaCiencia)
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

  // Se jogo completo, mostrar TelaPontuacao
  if (jogoCompleto) {
    // Geografia corresponde ao enum posição 2 (0=DADOLANDIA, 1=CIENCIAS, 2=GEOGRAFIA, 3=MATEMATICA, 4=HISTORIA)
    return <TelaPontuacao onVoltarTrilha={onVoltarTrilha} onVoltarMenu={onVoltarMenu} ilhaCompletada={2} />;
  }

  return (
    <main 
      // className="min-h-screen relative overflow-hidden w-full"
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${fundoGeografia})`,
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

      {/* Debug Visual - String de índices no canto esquerdo */}
      {/* <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-xs"> */}
      {/*   <h3 className="text-sm font-bold mb-2">Debug - Índices:</h3> */}
      {/*   <p className="text-xs break-words"> */}
      {/*     {stringIndices || 'Nenhum botão selecionado'} */}
      {/*   </p> */}
      {/*   <p className="text-xs mt-2 text-gray-300"> */}
      {/*     Total: {botoesClicados.size} botões */}
      {/*   </p> */}
      {/* </div> */}

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
    </div>
    </main>
  );
};

export default JogoGeografia;
