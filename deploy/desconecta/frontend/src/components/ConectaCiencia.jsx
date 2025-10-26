import React from 'react';
import MenuNavegacao from './ui/MenuNavegacao';
import TelaPontuacao from './TelaPontuacao';

// Importar imagem de fundo
import fundoConecta from '../assets/HistoriaCiencia/JogoCiencia/Background.png';

// Importar letreiro e texto conecta
import letreirosConecta from '../assets/HistoriaCiencia/JogoCiencia/LetreiroConectaPNG.png';
import textoConecta from '../assets/HistoriaCiencia/JogoCiencia/TextoConectaPNG.png';

// Importar botão confirma
import botaoresolvido from '../assets/HistoriaCiencia/JogoCiencia/Botao-confirma.png';

// Importar popup de erro
import popupErro from '../assets/HistoriaCiencia/JogoCiencia/Pop-up-erros.png';

// Importar imagens dos botões
import imagemSapo from '../assets/HistoriaCiencia/JogoCiencia/Sapo.png';
import imagemCasco from '../assets/HistoriaCiencia/JogoCiencia/Casco.png';
import imagemGirino from '../assets/HistoriaCiencia/JogoCiencia/Girino.png';
import imagemPena from '../assets/HistoriaCiencia/JogoCiencia/Pena.png';
import imagemPelo from '../assets/HistoriaCiencia/JogoCiencia/Pelo.png';
import imagemPassarinho from '../assets/HistoriaCiencia/JogoCiencia/Passarinho.png';
import imagemCoelho from '../assets/HistoriaCiencia/JogoCiencia/Coelho.png';
import imagemOvosSapo from '../assets/HistoriaCiencia/JogoCiencia/Ovos-sapo.png';
import imagemEscamas from '../assets/HistoriaCiencia/JogoCiencia/Escama.png';
import imagemLeite from '../assets/HistoriaCiencia/JogoCiencia/Leite.png';
import imagemBico from '../assets/HistoriaCiencia/JogoCiencia/Bico.png';
import imagemCobra from '../assets/HistoriaCiencia/JogoCiencia/Cobra.png';

// Importar imagens de resolvidoção
import imagemSaporesolvido from '../assets/HistoriaCiencia/JogoCiencia/Sapo-resolvido.png';
import imagemCascoresolvido from '../assets/HistoriaCiencia/JogoCiencia/Casco-resolvido.png';
import imagemGirinoresolvido from '../assets/HistoriaCiencia/JogoCiencia/Girino-resolvido.png';
import imagemPenaresolvido from '../assets/HistoriaCiencia/JogoCiencia/Pena-resolvido.png';
import imagemPeloresolvido from '../assets/HistoriaCiencia/JogoCiencia/Pelo-resolvido.png';
import imagemPassarinhoresolvido from '../assets/HistoriaCiencia/JogoCiencia/Passarinho-resolvido.png';
import imagemCoelhoresolvido from '../assets/HistoriaCiencia/JogoCiencia/Coelho-resolvido.png';
import imagemOvosSaporesolvido from '../assets/HistoriaCiencia/JogoCiencia/Ovos-resolvido.png';
import imagemEscamasresolvido from '../assets/HistoriaCiencia/JogoCiencia/Escamas-resolvido.png';
import imagemLeiteresolvido from '../assets/HistoriaCiencia/JogoCiencia/Leite-resolvido.png';
import imagemBicoresolvido from '../assets/HistoriaCiencia/JogoCiencia/Bico-resolvido.png';
import imagemCobraresolvido from '../assets/HistoriaCiencia/JogoCiencia/Cobra-resolvida.png';

// Array com as imagens e nomes dos botões em ordem
const botoesData = [
  { nome: 'Sapo', imagem: imagemSapo, imagemresolvido: imagemSaporesolvido },
  { nome: 'Casco', imagem: imagemCasco, imagemresolvido: imagemCascoresolvido },
  { nome: 'Girino', imagem: imagemGirino, imagemresolvido: imagemGirinoresolvido },
  { nome: 'Pena', imagem: imagemPena, imagemresolvido: imagemPenaresolvido },
  { nome: 'Pelo', imagem: imagemPelo, imagemresolvido: imagemPeloresolvido },
  { nome: 'Passarinho', imagem: imagemPassarinho, imagemresolvido: imagemPassarinhoresolvido },
  { nome: 'Coelho', imagem: imagemCoelho, imagemresolvido: imagemCoelhoresolvido },
  { nome: 'Ovos Sapo', imagem: imagemOvosSapo, imagemresolvido: imagemOvosSaporesolvido },
  { nome: 'Escamas', imagem: imagemEscamas, imagemresolvido: imagemEscamasresolvido },
  { nome: 'Leite', imagem: imagemLeite, imagemresolvido: imagemLeiteresolvido },
  { nome: 'Bico', imagem: imagemBico, imagemresolvido: imagemBicoresolvido },
  { nome: 'Cobra', imagem: imagemCobra, imagemresolvido: imagemCobraresolvido }
];

// --- Componente: Conecta Ciência ---
const ConectaCiencia = ({ onVoltarTrilha, onVoltarMenu }) => {
  const [mostrarPontuacao, setMostrarPontuacao] = React.useState(false);
  const [botoesClicados, setBotoesClicados] = React.useState(new Set());
  const [stringPosicoes, setStringPosicoes] = React.useState('');
  const [respostaCorreta, setRespostaCorreta] = React.useState(false);
  const [mostrarresolvidocao, setMostrarresolvidocao] = React.useState(false);
  const [botoesCorretos, setBotoesCorretos] = React.useState(new Set());
  const [respostasCorretas, setRespostasCorretas] = React.useState(0);
  const [mostrarPopupErro, setMostrarPopupErro] = React.useState(false);

  // Função para ir para a tela de pontuação
  const irParaPontuacao = () => {
    setMostrarPontuacao(true);
  };

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
      const novaString = stringPosicoes.replace(letra, '').split('').sort().join('');
      setStringPosicoes(novaString);
    } else {
      // Verifica se já há 3 botões selecionados
      if (botoesClicados.size >= 3) {
        console.log('Máximo de 3 botões já selecionados!');
        return; // Não permite selecionar mais
      }
      
      // Se não foi clicado e há espaço, adiciona à seleção
      novosBotoesClicados.add(index);
      // Adiciona à string de posições (adiciona a letra correspondente) e ordena
      setStringPosicoes(prev => (prev + letra).split('').sort().join(''));
    }
    
    setBotoesClicados(novosBotoesClicados);
    console.log(`Botão ${index} (${letra}) ${botoesClicados.has(index) ? 'desmarcado' : 'marcado'}`);
    console.log('String de letras atual:', botoesClicados.has(index) ? stringPosicoes.replace(letra, '') : stringPosicoes + letra);
    console.log(`Total selecionados: ${novosBotoesClicados.size}/3`);
  };

  // Se deve mostrar a tela de pontuação, renderizar TelaPontuacao
  if (mostrarPontuacao) {
    // Ciências corresponde ao enum posição 1 (0=DADOLANDIA, 1=CIENCIAS, 2=GEOGRAFIA, 3=MATEMATICA, 4=HISTORIA)
    return <TelaPontuacao onVoltarTrilha={onVoltarTrilha} onVoltarMenu={onVoltarMenu} ilhaCompletada={1} />;
  }

  return (
    <main 
      className="min-h-screen relative overflow-hidden w-full"
      style={{
        backgroundImage: `url(${fundoConecta})`,
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

{/* Letreiro e Texto Conecta */}
<div className="absolute top-16 transform scale-y-90 sm:top-20 md:top-24 lg:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 px-4">
  {/* Letreiro Conecta */}
  <div className="mb-3">
    <img 
      src={letreirosConecta} 
      alt="Letreiro Conecta"
      className="max-w-full w-44 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
      //                                        256px  288px   320px   384px     448px        512px
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
      }}
    />
  </div>

  {/* Texto Conecta  */}
  <div>
    <img 
      src={textoConecta} 
      alt="Texto Conecta"
      className="max-w-full h-auto object-contain w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem]"
      //                                        320px  384px     448px        512px        576px        640px
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
      }}
    />
  </div>
</div>

      {/* Conteúdo da tela ConectaCiencia - Matriz de botões 3x4 */}
      <div className="h-screen w-screen pt-6 flex justify-center items-start translate-y-24 scale-y-90">
        <div className="grid grid-cols-4 gap-0.5 h-[80vh] w-[90vw] sm:gap-3 md:gap-4 lg:gap-1 xl:gap-6 place-items-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          {/* Gerar 12 botões (3 linhas x 4 colunas) com imagens */}
          {/* BOTÕES AGORA RESPONSIVOS - Remover style fixo */}
{botoesData.map((botao, index) => (
  <button
    key={index}
    onClick={() => handleBotaoClick(index)}
    className="bg-transparent transition-all duration-300 transform hover:scale-105 active:scale-95 p-0 overflow-hidden relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-40 2xl:h-40"
    style={{ 
      border: 'none',
      outline: 'none',
      cursor: botoesCorretos.has(index) ? 'default' : 'pointer'
    }}
            >
              <div className="relative w-full h-full">
                <img 
                  src={
                    respostaCorreta && mostrarresolvidocao && botoesCorretos.has(index)
                      ? botao.imagemresolvido
                      : botao.imagem
                  }
                  alt={botao.nome}
                  className="w-full h-full object-contain block"
                  style={{
                    border: 'none',
                    outline: 'none'
                  }}
                  onError={(e) => {
                    console.error(`Erro ao carregar imagem: ${botao.nome}`);
                    // Se a imagem -resolvido.png não existir, volta para a original
                    if (e.target.src.includes('-resolvido.png')) {
                      e.target.src = botao.imagem;
                    } else {
                      e.target.style.display = 'none';
                    }
                  }}
                />
                {/* Máscara roxa translúcida que segue os contornos da imagem */}
                {botoesClicados.has(index) && (
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
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Botão resolvidor com Imagem - Lado Direito */}
      <button
        onClick={async () => {
          if (botoesClicados.size !== 3) return;
          
          try {
            // Ordenar a string alfabeticamente
            const stringOrdenada = stringPosicoes.split('').sort().join('');
            console.log('Enviando resposta:', stringOrdenada);
            
            // Fazer requisição para API
            // const response = await fetch(`http://localhost:8080/api/conecta/verificar/1?resposta=${stringOrdenada}`);
            const response = await fetch(`${window.location.origin}/desconecta/api/conecta/verificar/1?resposta=${stringOrdenada}`);
            const resultado = await response.text();
            
            console.log('Resposta da API:', resultado);
            
            if (resultado === 'True') {
              setRespostaCorreta(true);
              setMostrarresolvidocao(true);
              
              // ACUMULAR botões corretos - não substituir, adicionar aos existentes
              const novosBotoesCorretos = new Set(botoesCorretos);
              botoesClicados.forEach(index => novosBotoesCorretos.add(index));
              setBotoesCorretos(novosBotoesCorretos);
              
              // Incrementar contador de respostas corretas
              const novasRespostasCorretas = respostasCorretas + 1;
              setRespostasCorretas(novasRespostasCorretas);
              
              console.log('Resposta correta! Mostrando imagens de resolvidoção.');
              console.log(`Respostas corretas: ${novasRespostasCorretas}/4`);
              
              // Se chegou a 4 respostas corretas, ir para a tela de pontuação
              if (novasRespostasCorretas >= 4) {
                setTimeout(() => {
                  setMostrarPontuacao(true);
                }, 1500); // Aguarda 1.5 segundos para mostrar a imagem resolvida antes de ir para pontuação
              }
            } else {
              console.log('Resposta incorreta.');
              // Mostrar popup de erro
              setMostrarPopupErro(true);
              // Ocultar popup após 2 segundos
              setTimeout(() => {
                setMostrarPopupErro(false);
              }, 2000);
            }
            
            // Desselecionar todos os botões após enviar resposta
            setBotoesClicados(new Set());
            setStringPosicoes('');
          } catch (error) {
            console.error('Erro ao enviar resposta:', error);
          }
        }}
        disabled={botoesClicados.size !== 3}
        className={`fixed bottom-8 right-8 bg-transparent border-none p-0 transition-all duration-300 transform hover:scale-105 active:scale-95 z-20 ${
          botoesClicados.size !== 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{ 
          outline: 'none'
        }}
      >
        <img 
          src={botaoresolvido} 
          alt="resolvidor Resposta"
          className="w-auto h-auto object-contain"
          style={{
            maxWidth: '85%',
            height: 'auto',
            filter: botoesClicados.size !== 3 ? 'grayscale(100%) brightness(0.5)' : 'none'
          }}
          onError={(e) => {
            console.error('Erro ao carregar imagem do botão resolvido');
            e.target.style.display = 'none';
          }}
        />
      </button>

      {/* Popup de Erro */}
      {mostrarPopupErro && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setMostrarPopupErro(false)}
        >
          <div className="relative">
            <img 
              src={popupErro} 
              alt="Erro - Resposta Incorreta"
              className="max-w-[70vw] max-h-[70vh] object-contain"
              onClick={(e) => {
                e.stopPropagation();
                setMostrarPopupErro(false);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ConectaCiencia;
