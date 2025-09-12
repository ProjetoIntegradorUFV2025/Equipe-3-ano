import React from 'react';

// --- Módulo 1: Botão de Ação ---
// Um componente reutilizável para os botões "Entrar" and "Cadastrar".
// Recebe um 'onClick' para a ação e 'children' para o texto do botão.
const ActionButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#6d28d9] text-white font-bold text-lg py-3 rounded-3xl shadow-lg transform hover:scale-105 hover:bg-[#5b21b6] transition-transform duration-300"
    >
      {children}
    </button>
  );
};

// --- Módulo 2: Painel do Mascote (Esquerda) ---
// Este módulo cuida da parte esquerda da tela, que exibe o mascote.
const MascotePanel = () => {
  return (
    <div className="w-full md:w-1/2 p-8 flex justify-center items-center bg-[#0f172a]">
      <img
        src="https://placehold.co/400x400/0f172a/FFF?text=Mascote"
        alt="Mascote do jogo (Des)conecta"
        className="w-full max-w-sm"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/0f172a/FFF?text=Imagem+Indisponível'; }}
      />
    </div>
  );
};

// --- Módulo 3: Painel de Ações (Direita) ---
// Este módulo é o painel roxo com o logo e os botões.
const ActionsPanel = ({ onEntrarClick, onCadastrarClick }) => {
  return (
    <div className="w-full md:w-1/2 bg-[#4c1d95] p-10 flex flex-col justify-center items-center">
      <div className="mb-12">
        <img
          src="https://placehold.co/300x100/4c1d95/FFF?text=(DES)CONECTA"
          alt="Logo (Des)conecta"
          className="w-48"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x100/4c1d95/FFF?text=Logo'; }}
        />
      </div>
      <div className="w-full max-w-xs flex flex-col gap-y-6">
        <ActionButton onClick={onEntrarClick}>Entrar</ActionButton>
        <ActionButton onClick={onCadastrarClick}>Cadastrar</ActionButton>
      </div>
    </div>
  );
};


// --- Componente Principal: Tela Inicial ---
// Agora, a TelaInicial apenas organiza os módulos que criamos.
// Fica muito mais limpo e fácil de entender.
const TelaInicial = () => {
  const handleEntrar = () => {
    console.log('Navegando para a tela de Login...');
  };

  const handleCadastrar = () => {
    console.log('Navegando para a tela de Cadastro...');
  };

  return (
    <main className="bg-[#1e293b] min-h-screen w-full flex justify-center items-center p-4 font-sans">
      {/* O container principal agora tem o arredondamento e `overflow-hidden`
        para garantir que os cantos dos módulos filhos fiquem corretos.
      */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-[2.5rem] shadow-2xl overflow-hidden">
        <MascotePanel />
        <ActionsPanel onEntrarClick={handleEntrar} onCadastrarClick={handleCadastrar} />
      </div>
    </main>
  );
};

export default TelaInicial;

