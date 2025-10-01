import React from 'react';
import MenuNavegacao from './ui/MenuNavegacao';
import TelaPontuacao from './TelaPontuacao';

// Importar imagem de fundo
import fundoConecta from '../assets/HistoriaCiencia/JogoCiencia/Background.png';

// Importar letreiro e texto conecta
import letreirosConecta from '../assets/HistoriaCiencia/JogoCiencia/LetreiroConectaPNG.png';
import textoConecta from '../assets/HistoriaCiencia/JogoCiencia/TextoConectaPNG.png';

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

// Array com as imagens e nomes dos botões em ordem
const botoesData = [
  { nome: 'Sapo', imagem: imagemSapo },
  { nome: 'Casco', imagem: imagemCasco },
  { nome: 'Girino', imagem: imagemGirino },
  { nome: 'Pena', imagem: imagemPena },
  { nome: 'Pelo', imagem: imagemPelo },
  { nome: 'Passarinho', imagem: imagemPassarinho },
  { nome: 'Coelho', imagem: imagemCoelho },
  { nome: 'Ovos Sapo', imagem: imagemOvosSapo },
  { nome: 'Escamas', imagem: imagemEscamas },
  { nome: 'Leite', imagem: imagemLeite },
  { nome: 'Bico', imagem: imagemBico },
  { nome: 'Cobra', imagem: imagemCobra }
];

// --- Componente: Conecta Ciência ---
const ConectaCiencia = ({ onVoltarTrilha, onVoltarMenu }) => {
  const [mostrarPontuacao, setMostrarPontuacao] = React.useState(false);
  const [botoesClicados, setBotoesClicados] = React.useState(new Set());
  const [stringPosicoes, setStringPosicoes] = React.useState('');

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

{/* Letreiro e Texto Conecta - CORRIGIDO COM POSICIONAMENTO */}
<div className="absolute top-16 sm:top-20 md:top-24 lg:top-28 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 px-4">
  {/* Letreiro Conecta - MUITO MAIOR */}
  <div className="mb-3">
    <img 
      src={letreirosConecta} 
      alt="Letreiro Conecta"
      className="max-w-full h-auto object-contain w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
      //                                        256px  288px   320px   384px     448px        512px
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
      }}
    />
  </div>

  {/* Texto Conecta - MUITO MAIOR */}
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
      <div className="w-full h-screen flex items-end justify-center pb-2 px-4">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 place-items-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          {/* Gerar 12 botões (3 linhas x 4 colunas) com imagens */}
          {/* BOTÕES AGORA RESPONSIVOS - Remover style fixo */}
{botoesData.map((botao, index) => (
  <button
    key={index}
    onClick={() => handleBotaoClick(index)}
    className="bg-transparent transition-all duration-300 transform hover:scale-105 active:scale-95 p-0 overflow-hidden relative
               w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-40 2xl:h-40"
    // ↑ REMOVER O STYLE FIXO E USAR APENAS CLASSES TAILWIND
    style={{ 
      border: 'none',
      outline: 'none'
      // width e height removidos!
    }}
            >
              <div className="relative w-full h-full">
                <img 
                  src={botao.imagem} 
                  alt={botao.nome}
                  className="w-full h-full object-contain block"
                  style={{
                    border: 'none',
                    outline: 'none'
                  }}
                  onError={(e) => {
                    console.error(`Erro ao carregar imagem: ${botao.nome}`);
                    e.target.style.display = 'none';
                  }}
                />
                {/* Máscara roxa que segue os contornos da imagem - corrigida para responsividade */}
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

      {/* Botão no canto inferior esquerdo */}
      <button
        onClick={() => {
          // Ordenar a string alfabeticamente
          const stringOrdenada = stringPosicoes.split('').sort().join('');
          console.log('String original:', stringPosicoes);
          console.log('String ordenada:', stringOrdenada);
          // Aqui você pode enviar a stringOrdenada para o backend
          //irParaPontuacao();
        }}
        className="fixed bottom-8 left-8 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl z-20"
        style={{ 
          backgroundColor: '#563066',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#563066'}
      >
        Enviar Resposta
      </button>
    </main>
  );
};

export default ConectaCiencia;