
import React, { useState, useEffect } from 'react';

import MenuNavegacao from './ui/MenuNavegacao';

// Importar imagem de fundo
import fundoHistoria from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Background.png';

// Importar letreiro e fundo caça palavras
import letreiroCacaPalavras from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Titulo.png';
import fraseCacaPalavra from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Cabecalho.png';

// Importar imagens do jogo
import botaoConfirmar from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Botao confirma.png';
import botaoConfirmarCinza from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Botao confirma cinza.png';
import popupErro from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Pop up erros.png';

// Importar componente de pontuação
import TelaPontuacao from './TelaPontuacao';

// Importar as imagens dos botões
import imagemAreia from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Areia.png';
import imagemAreiaAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Areia_Acertou.png';
import imagemBoneco from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Boneco_Neve.png';
import imagemBonecoAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Boneco_Acertou.png';
import imagemCeleiro from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Celeiro.png';
import imagemCeleiroAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Celeiro_Acertou.png';
import imagemConcha from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Concha.png';
import imagemConchaAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Concha_Acertou.png';
import imagemGelo from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Gelo.png';
import imagemGeloAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Gelo_Acertou.png';
import imagemMetro from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Metro.png';
import imagemMetroAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Metro_Acertou.png';
import imagemMontanha from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Montanha.png';
import imagemMontanhaAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Montanha_Acertou.png';
import imagemOnda from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Onda.png';
import imagemOndaAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Onda_Acertou.png';
import imagemPlantacao from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Plantacao.png';
import imagemPlantacaoAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Plantacao_Acertou.png';
import imagemPredio from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Predio.png';
import imagemPredioAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Predio_Acertou.png';
import imagemShopping from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Shopping.png';
import imagemShoppingAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Shopping_Acertou.png';
import imagemTrator from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Trator.png';
import imagemTratorAcertou from '../assets/Sprites_Historinha_Historia/Sprites_Conecta_Historia/Historia_Conecta_Trator_Acertou.png';

// Array com as imagens e nomes dos botões em ordem
const botoesData = [
  { nome: "Areia", imagem: imagemAreia, imagemAcertou: imagemAreiaAcertou },
  { nome: "Boneco", imagem: imagemBoneco, imagemAcertou: imagemBonecoAcertou },
  { nome: "Celeiro", imagem: imagemCeleiro, imagemAcertou: imagemCeleiroAcertou },
  { nome: "Concha", imagem: imagemConcha, imagemAcertou: imagemConchaAcertou },
  { nome: "Gelo", imagem: imagemGelo, imagemAcertou: imagemGeloAcertou },
  { nome: "Metro", imagem: imagemMetro, imagemAcertou: imagemMetroAcertou },
  { nome: "Montanha", imagem: imagemMontanha, imagemAcertou: imagemMontanhaAcertou },
  { nome: "Onda", imagem: imagemOnda, imagemAcertou: imagemOndaAcertou },
  { nome: "Plantacao", imagem: imagemPlantacao, imagemAcertou: imagemPlantacaoAcertou },
  { nome: "Predio", imagem: imagemPredio, imagemAcertou: imagemPredioAcertou },
  { nome: "Shopping", imagem: imagemShopping, imagemAcertou: imagemShoppingAcertou },
  { nome: "Trator", imagem: imagemTrator, imagemAcertou: imagemTratorAcertou },
];

// --- Componente: Conecta História ---
const ConectaHistoria = ({ onVoltarTrilha, onVoltarMenu, onConcluido, onAbrirRanking }) => {
  const [palavrasEncontradas, setPalavrasEncontradas] = useState(0);
  const totalPalavras = 4; // Total de grupos de 3 palavras que devem ser encontrados
  const [botoesClicados, setBotoesClicados] = useState(new Set());
  const [botoesCorretos, setBotoesCorretos] = useState(new Set());
  const [stringPosicoes, setStringPosicoes] = useState('');
  const [mostrarPopupErro, setMostrarPopupErro] = useState(false);
  const [jogoCompleto, setJogoCompleto] = useState(false);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [numeroErros, setNumeroErros] = useState(0);
  const [mostrarPopupInicial, setMostrarPopupInicial] = useState(true);

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

  // Função para converter índice para letra (0=a, 1=b, 2=c, etc.)
  const indiceParaLetra = (index) => {
    return String.fromCharCode(97 + index); // 97 é o código ASCII para 'a'
  };

  // Função para lidar com cliques nos botões
  const handleBotaoClick = (index) => {
    // Não permite clique em botões que já estão corretos
    if (botoesCorretos.has(index)) {
      return; // Botão bloqueado, não responde a cliques
    }

    const novosBotoesClicados = new Set(botoesClicados);
    const letra = indiceParaLetra(index);

    if (botoesClicados.has(index)) {
      // Se já foi clicado, remove da seleção
      novosBotoesClicados.delete(index);
      // Remove da string de posições (remove a letra correspondente) e ordena
      const novaString = stringPosicoes
        .replace(letra, '')
        .split('')
        .sort()
        .join('');
      setStringPosicoes(novaString);
    } else {
      // Verifica se já há 3 botões selecionados
      if (botoesClicados.size >= 3) {
        // console.log('Máximo de 3 botões já selecionados!');
        return; // Não permite selecionar mais
      }

      // Se não foi clicado e há espaço, adiciona à seleção
      novosBotoesClicados.add(index);
      // Adiciona à string de posições (adiciona a letra correspondente) e ordena
      setStringPosicoes((prev) => (prev + letra).split('').sort().join(''));
    }

    setBotoesClicados(novosBotoesClicados);
    // console.log(
    //   `Botão ${index} (${letra}) ${
    //     botoesClicados.has(index) ? 'desmarcado' : 'marcado'
    //   }`
    // );
    // console.log(
    //   'String de letras atual:',
    //   botoesClicados.has(index)
    //     ? stringPosicoes.replace(letra, '')
    //     : stringPosicoes + letra
    // );
    // console.log(`Total selecionados: ${novosBotoesClicados.size}/3`);
  };

  // Função para verificar resposta na API
  const verificarResposta = async () => {
    if (botoesClicados.size !== 3) return;

    try {
      // Ordenar a string alfabeticamente
      const stringOrdenada = stringPosicoes.split('').sort().join('');

      // console.log('Enviando resposta para a API:', stringOrdenada);

      // Criar os parâmetros para enviar no corpo da requisição
      const params = new URLSearchParams();
      params.append('tipoDesafio', 'JogoConecta'); // O tipo do desafio
      params.append('id', '2'); // O ID do desafio do Conecta de História
      params.append('tentativa', stringOrdenada); // A resposta do jogador

      // Fazer a requisição para o novo endpoint unificado
      const response = await fetch(
        // 'http://localhost:8080/api/desafio/verificar',
        `${window.location.origin}/desconecta/api/desafio/verificar`,
        {
          method: 'POST',
          body: params,
        }
      );

      const resultado = await response.text();
      // console.log('Resposta da API:', resultado);

      if (resultado === 'True') {
        // Resposta correta - transformar botões roxos em acertou e bloquear
        const novosBotoesCorretos = new Set(botoesCorretos);
        botoesClicados.forEach((index) => {
          novosBotoesCorretos.add(index);
        });
        setBotoesCorretos(novosBotoesCorretos);

        // Incrementar palavras encontradas
        setPalavrasEncontradas((prev) => {
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
                    // `http://localhost:8080/api/desafio/verificarConcluido?pkAluno=${alunoId}&nomeIlha=HISTORIA`
                    `${window.location.origin}/desconecta/api/desafio/verificarConcluido?pkAluno=${alunoId}&nomeIlha=HISTORIA`
                  );

                  if (!responseVerificar.ok) {
                    throw new Error('Erro ao verificar status do desafio');
                  }

                  const desafioConcluido = await responseVerificar.json();
                  // console.log(
                  //   'Status do desafio:',
                  //   desafioConcluido ? '✅ Já concluído' : '⏳ Não concluído'
                  // );
                  //
                  let pontuacaoCalculada = 0;

                  // SEGUNDO: Salvar pontuação APENAS se o desafio NÃO foi concluído
                  if (!desafioConcluido) {
                    // console.log('💾 Salvando pontuação (primeira vez)...');
                    const responsePontuacao = await fetch(
                      // `http://localhost:8080/api/desafio/salvarPontuacao?pkAluno=${alunoId}&nomeIlha=HISTORIA&tempo=${tempoFinal}&numErros=${numeroErros}`,
                      `${window.location.origin}/desconecta/api/desafio/salvarPontuacao?pkAluno=${alunoId}&nomeIlha=HISTORIA&tempo=${tempoFinal}&numErros=${numeroErros}`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }
                    );

                    if (responsePontuacao.ok) {
                      pontuacaoCalculada = await responsePontuacao.json();
                      // console.log(
                      //   '✅ Pontuação calculada e salva:',
                      //   pontuacaoCalculada
                      // );
                      //
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
                      console.error(
                        '❌ Erro ao salvar pontuação. Status:',
                        responsePontuacao.status
                      );
                      const errorText = await responsePontuacao.text();
                      console.error('Resposta do servidor:', errorText);

                      if (errorText === '-2') {
                        // console.log(
                        //   '⚠️ Desafio já estava concluído (código -2)'
                        // );
                        pontuacaoCalculada =
                          1000 - tempoFinal * 2 - numeroErros * 50;
                        pontuacaoCalculada = Math.max(pontuacaoCalculada, 0);
                      }
                    }
                  } else {
                    // console.log(
                    //   '⚠️ Desafio já foi concluído anteriormente. Pontuação NÃO será salva.'
                    // );
                    // console.log('Calculando pontuação apenas para exibição...');
                    pontuacaoCalculada =
                      1000 - tempoFinal * 2 - numeroErros * 50;
                    pontuacaoCalculada = Math.max(pontuacaoCalculada, 0);
                  }

                  // Armazenar dados para a TelaPontuacao
                  sessionStorage.setItem(
                    'dadosPontuacao',
                    JSON.stringify({
                      tempo: tempoFinal,
                      tentativas: numeroErros,
                      pontos: pontuacaoCalculada,
                      jaFoiConcluido: desafioConcluido,
                    })
                  );
                }
              } catch (error) {
                console.error(
                  '❌ Erro ao processar conclusão do jogo:',
                  error
                );
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
        setNumeroErros((prev) => prev + 1);

        setMostrarPopupErro(true);

        setTimeout(() => {
          setMostrarPopupErro(false);
        }, 2000);
      }

      // Em ambos os casos, limpar seleção atual e string
      setBotoesClicados(new Set());
      setStringPosicoes('');
    } catch (error) {
      console.error('Erro ao verificar resposta:', error);
      // Em caso de erro, também limpar
      setBotoesClicados(new Set());
      setStringPosicoes('');
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
    return (
      <TelaPontuacao
        onVoltarTrilha={onVoltarTrilha}
        onVoltarMenu={onVoltarMenu}
        onAbrirRanking={onAbrirRanking}
        ilhaCompletada={4}
        nomeIlhaJogada="HISTORIA"
      />
    );
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden w-full"
      style={{
        backgroundImage: `url(${fundoHistoria})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Menu de Navegação Reutilizável */}
      <MenuNavegacao
        onVoltarTrilha={onVoltarTrilha}
        onVoltarMenu={onVoltarMenu}
        onAbrirRanking={onAbrirRanking}
        posicao="top-right"
        tipoTutorial="conecta"
      />

      {/* Letreiro e Texto Conecta */}
      <div className="absolute top-16 transform scale-y-90 sm:top-20 md:top-24 lg:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 px-4">
        {/* Letreiro Conecta */}
        <div className="mb-3">
          <img
            src={letreiroCacaPalavras}
            alt="Letreiro Conecta"
            className="max-w-full w-44 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            }}
          />
        </div>

        {/* Texto Conecta  */}
        <div>
          <img
            src={fraseCacaPalavra}
            alt="Texto Conecta"
            className="max-w-full h-auto object-contain w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem]"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
            }}
          />
        </div>
      </div>

      {/* Conteúdo da tela ConectaHistoria - Matriz de botões 3x4 */}
      <div className="h-screen w-screen pt-6 flex justify-center items-start translate-y-24 scale-y-90">
        <div className="grid grid-cols-4 gap-0.5 h-[80vh] w-[90vw] sm:gap-3 md:gap-4 lg:gap-1 xl:gap-6 place-items-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          {/* Gerar 12 botões (3 linhas x 4 colunas) com imagens */}
          {botoesData.map((botao, index) => (
            <button
              key={index}
              onClick={() => handleBotaoClick(index)}
              className="bg-transparent transition-all duration-300 transform hover:scale-105 active:scale-95 p-0 overflow-hidden relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-40 2xl:h-40"
              style={{
                border: 'none',
                outline: 'none',
                cursor: botoesCorretos.has(index) ? 'default' : 'pointer',
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={
                    botoesCorretos.has(index)
                      ? botao.imagemAcertou
                      : botao.imagem
                  }
                  alt={botao.nome}
                  className="w-full h-full object-contain block"
                  style={{
                    border: 'none',
                    outline: 'none',
                  }}
                  onError={(e) => {
                    console.error(`Erro ao carregar imagem: ${botao.nome}`);
                    // Se a imagem _Acertou.png não existir, volta para a original
                    if (e.target.src.includes('_Acertou.png')) {
                      e.target.src = botao.imagem;
                    } else {
                      e.target.style.display = 'none';
                    }
                  }}
                />
                {/* Máscara roxa translúcida que segue os contornos da imagem */}
                {botoesClicados.has(index) && !botoesCorretos.has(index) && (
                  <div
                    className="absolute inset-0 transition-opacity duration-300 rounded-sm"
                    style={{
                      backgroundColor: 'rgba(86, 48, 102, 0.5)',
                      maskImage: `url(${botao.imagem})`,
                      WebkitMaskImage: `url(${botao.imagem})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Indicador de Progresso - Canto superior direito */}
      <div className="fixed top-24 right-8 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg">
        <div className="text-2xl font-bold text-purple-800">
          {palavrasEncontradas}/{totalPalavras}
        </div>
        <div className="text-sm text-gray-600">Grupos encontrados</div>
      </div>

      {/* Botão Confirmar com Imagem - Lado Direito */}
      <button
        onClick={verificarResposta}
        disabled={botoesClicados.size !== 3}
        className={`fixed bottom-8 right-8 bg-transparent border-none p-0 transition-all duration-300 transform hover:scale-105 active:scale-95 z-20 ${
          botoesClicados.size !== 3
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        }`}
        style={{
          outline: 'none',
        }}
      >
        <img
          src={botoesClicados.size === 3 ? botaoConfirmar : botaoConfirmarCinza}
          alt="Confirmar Resposta"
          className="w-auto h-auto object-contain"
          style={{
            maxWidth: '85%',
            height: 'auto',
          }}
          onError={(e) => {
            console.error('Erro ao carregar imagem do botão confirmar');
            e.target.style.display = 'none';
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
              alt="Erro - Resposta Incorreta"
              className="max-w-[70vw] max-h-[70vh] object-contain"
              onClick={(e) => {
                e.stopPropagation();
                fecharPopupErro();
              }}
            />
          </div>
        </div>
      )}

      {/* Popup Inicial - CONECTA */}
      {mostrarPopupInicial && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
          onClick={() => setMostrarPopupInicial(false)}
        >
          <div className="text-center">
            <img
              src={fraseCacaPalavra}
              alt="Conecta"
              className="w-[90vw] max-w-5xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(138, 112, 163, 0.8)) drop-shadow(0 0 60px rgba(138, 112, 163, 0.6))'
              }}
            />
            <p className="text-white text-3xl mt-8 opacity-75">
              Clique para começar
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ConectaHistoria;
