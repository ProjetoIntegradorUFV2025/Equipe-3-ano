import React, { useEffect } from 'react';
import MenuNavegacao from './ui/MenuNavegacao';
import useAlunoLogado from '../hooks/useAlunoLogado';

// Importar imagem de fundo
import fundoPontuacao from '../assets/fundo-tela-pontuacao.png';

// --- Componente: Tela Pontuação ---
const TelaPontuacao = ({ onVoltarTrilha, onVoltarMenu, ilhaCompletada = 1 }) => {
  const { alunoId, isLogado } = useAlunoLogado();
  
  // Valores temporários para exemplo - estes podem vir como props no futuro
  const tempoSegundos = 120;
  const tentativas = 3;
  const pontos = 850;

  // Função para avançar a ilha do aluno apenas se necessário
  const avancarIlhaAluno = async () => {
    if (!alunoId || !isLogado) {
      return false;
    }

    try {
      // Primeiro, buscar o ID do progresso do aluno
      const responseIdProgresso = await fetch(`http://localhost:8080/api/progresso-aluno/id/${alunoId}`);
      
      if (responseIdProgresso.ok) {
        const idProgressoAluno = await responseIdProgresso.json();
        
        if (idProgressoAluno) {
          // Verificar a posição atual da ilha
          const responsePosicaoAtual = await fetch(`http://localhost:8080/api/ilhas/posicao-ilha/${idProgressoAluno}`);
          
          if (responsePosicaoAtual.ok) {
            const posicaoAtual = await responsePosicaoAtual.json();
            
            // Só avança se a posição atual for menor ou igual à ilha que foi completada
            // Isso permite avanço na primeira vez e evita avanço em repetições
            if (posicaoAtual <= ilhaCompletada) {
              const responseAvancar = await fetch(`http://localhost:8080/api/ilhas/avancar-ilha/${idProgressoAluno}`, {
                method: 'PUT'
              });
              
              if (responseAvancar.ok) {
                const novaPosicao = await responseAvancar.json();
                console.log('Ilha avançada para posição:', novaPosicao);
                return true;
              }
            } else {
              console.log('Ilha já foi avançada anteriormente, não avançando novamente');
            }
          }
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao avançar ilha:', error);
      return false;
    }
  };

  // Função para voltar à trilha e forçar recarregamento
  const handleVoltarTrilha = async () => {
    // Sinaliza que o progresso foi atualizado para forçar recarregamento
    localStorage.setItem('progressoAtualizado', 'true');
    onVoltarTrilha();
  };

  // Avançar a ilha quando a tela de pontuação for carregada
  useEffect(() => {
    if (alunoId && isLogado) {
      avancarIlhaAluno();
    }
  }, [alunoId, isLogado]);
  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${fundoPontuacao})`,
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

      {/* Conteúdo da tela de pontuação */}
      <div className="w-full h-screen flex items-end justify-center pb-4">
        <div className="text-white">
          <div className="text-5xl font-sans font-bold leading-relaxed mb-16">
            <div className="mb-2 text-left">Tempo ...................... {tempoSegundos}</div>
            <div className="mb-4 text-left">Tentativas ................. {tentativas}</div>
            <div className="text-5xl font-bold text-center" style={{ color: '#feeb6c' }}>+{pontos} pontos</div>
          </div>
          
          {/* Botão Concluir */}
          <div className="text-center">
            <button
              onClick={handleVoltarTrilha}
              className="text-white font-bold py-6 px-16 rounded-full text-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ 
                backgroundColor: '#f93d6e',
                ':hover': { backgroundColor: '#e02a5b' }
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e02a5b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f93d6e'}
            >
              CONCLUIR
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TelaPontuacao;