import React, { useState } from 'react';
import fundoTelaLogin from '../assets/fundo-tela-login.png';

// --- Componente Principal: Tela de Cadastro ---
// Tela de cadastro com fundo e dois campos de entrada centralizados
const TelaCadastro = ({ voltarParaInicial, irParaLogin }) => {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    console.log('Dados do cadastro:', { apelido, senha });
    
    // Validação básica
    if (!apelido || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Dados que serão enviados para o backend
      const dadosAluno = {
        apelido: apelido,
        senha: senha
      };

      // Requisição para o endpoint de cadastro
      const response = await fetch('http://localhost:8080/api/aluno/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAluno)
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        const resultado = await response.json();
        if (resultado === true) {
          alert('Cadastro realizado com sucesso!');
          // Limpar os campos após sucesso
          setApelido('');
          setSenha('');
          // Opcionalmente, redirecionar para tela de login
          // irParaLogin();
        } else {
          alert('Erro ao realizar cadastro. Tente novamente.');
        }
      } else {
        alert('Erro na comunicação com o servidor.');
      }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      alert('Erro ao conectar com o servidor. Verifique sua conexão.');
    }
  };

  const handleIrParaLogin = () => {
    console.log('Indo para tela de login...');
    irParaLogin();
  };

  return (
    <main 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${fundoTelaLogin})` }}
    >
      {/* Container específico para as caixas de texto com posicionamento personalizado */}
      <div 
        className="absolute flex flex-col gap-12 max-w-xs items-center"
        style={{ 
          top: '25%',    /* ← MOVER CAIXAS VERTICALMENTE: altere este valor */
          left: '50%',   /* ← MOVER CAIXAS HORIZONTALMENTE: altere este valor */
          transform: 'translate(40%, 50%)' /* ← Mantém caixas centralizadas no ponto */
        }}
      >
        {/* Campo Apelido */}
          <input
            type="text"
            placeholder="Nome"
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
            className="px-8 py-4 bg-white text-gray-800 font-bold text-2xl rounded-full shadow-lg border-2 border-purple-800 focus:outline-none focus:border-purple-900 transition-all duration-300"
          />
          
          {/* Campo Senha */}
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="px-8 py-4 bg-white text-gray-800 font-bold text-2xl rounded-full shadow-lg border-2 border-purple-800 focus:outline-none focus:border-purple-900 transition-all duration-300"
          />
        </div>

        {/* Container separado para o botão com posicionamento independente */}
        <div 
          className="absolute flex flex-col gap-6 items-center"
          style={{ 
            top: '60%',    /* ← MOVER BOTÃO VERTICALMENTE: altere este valor */
            left: '50%',   /* ← MOVER BOTÃO HORIZONTALMENTE: altere este valor */
            transform: 'translate(10%, 50%)' /* ← Mantém botão centralizado no ponto */
          }}
        >
          <button
            onClick={handleCadastro}
            className="px-48 py-7 text-white font-bold text-2xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: '#563066', ':hover': { backgroundColor: '#4a2857' } }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4a2857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#563066'}
          >
            Cadastrar
          </button>
          
          {/* Texto com parte clicável e não clicável */}
          <div className="text-white font-bold text-xl">
            <span className="text-black">Já tem cadastro? </span>
            <span
              onClick={handleIrParaLogin}
              className="cursor-pointer hover:text-purple-300 underline hover:no-underline transition-all duration-300"
            >
              Entre Agora
            </span>
          </div>
        </div>
    </main>
  );
};

export default TelaCadastro;
