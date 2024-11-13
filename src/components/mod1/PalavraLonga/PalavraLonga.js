// src/components/mod3/PalavraLonga.js

import React, { useState } from 'react';
import './PalavraLonga.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import elefanteImg from '../../../assets/elefante.jpg';

function PalavraLonga({ onCompletion }) {
  const [letras, setLetras] = useState(['E', 'F', 'E', 'L', 'T', 'N', 'A', 'E']);
  const [posicoes, setPosicoes] = useState([null, null, null, null, null, null, null, null]);
  const [arrastando, setArrastando] = useState(null);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handleClick = (index) => {
    const novasPosicoes = [...posicoes];
    const novasLetras = [...letras];

    if (arrastando === null) {
      // Se clicou em um quadrado com letra -> devolve a letra à lista
      if (posicoes[index] !== null) {
        const primeiraPosicaoLivre = novasLetras.findIndex((letra) => letra === null);
        if (primeiraPosicaoLivre !== -1) {
          novasLetras[primeiraPosicaoLivre] = novasPosicoes[index];
          novasPosicoes[index] = null; // Remove a letra do quadrado
        }
      }
    } else {
      // Se clicou em um quadrado vazio -> move a letra selecionada
      if (novasPosicoes[index] === null) {
        novasPosicoes[index] = letras[arrastando];
        novasLetras[arrastando] = null; // Remove da lista de letras
        setArrastando(null); // Reseta o estado
      }
    }

    setPosicoes(novasPosicoes);
    setLetras(novasLetras);
  };

  const handleLetraClick = (index) => {
    if (arrastando === index) {
      // Desseleciona a letra se clicar novamente nela
      setArrastando(null);
    } else {
      // Seleciona a letra para movimentação
      setArrastando(index);
    }
  };

  const handleDragStart = (index) => {
    setArrastando(index);
  };

  const handleDrop = (index) => {
    if (arrastando !== null) {
      const novasPosicoes = [...posicoes];
      const novasLetras = [...letras];

      // Caso o quadrado já tenha uma letra -> devolve-a para a lista
      if (novasPosicoes[index] !== null) {
        const primeiraPosicaoLivre = novasLetras.findIndex((letra) => letra === null);
        if (primeiraPosicaoLivre !== -1) {
          novasLetras[primeiraPosicaoLivre] = novasPosicoes[index];
        }
      }

      // Move a letra arrastada para o quadrado
      novasPosicoes[index] = letras[arrastando];
      novasLetras[arrastando] = null; // Remove a letra da lista de opções

      setPosicoes(novasPosicoes);
      setLetras(novasLetras);
      setArrastando(null); // Reseta o estado de arrastando
    }
  };

  const verificarOrdem = () => {
    if (JSON.stringify(posicoes) === JSON.stringify(['E', 'L', 'E', 'F', 'A', 'N', 'T', 'E'])) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="palavra-longa-container">
      <h2>Organize as letras para formar a palavra correta!</h2>
      <img src={elefanteImg} alt="Imagem de um elefante" className="imagem-elefante" />
      <div className="quadrados-container">
        {posicoes.map((letra, index) => (
          <div
            key={index}
            className="quadrado"
            onClick={() => handleClick(index)} // Suporte a cliques
            onDragOver={(e) => e.preventDefault()} // Permite o arrastar e soltar
            onDrop={() => handleDrop(index)} // Solta a letra no quadrado
          >
            {letra ? letra : ''}
          </div>
        ))}
      </div>

      <div className="letras-container">
        {letras.map((letra, index) => (
          letra !== null && (
            <div
              key={index}
              className={`letra ${arrastando === index ? 'selecionada' : ''}`}
              onClick={() => handleLetraClick(index)} // Seleciona ou desseleciona a letra
              draggable // Permite arrastar no desktop
              onDragStart={() => handleDragStart(index)} // Inicia o arraste
            >
              {letra}
            </div>
          )
        ))}
      </div>

      <button className="verificar-btn" onClick={verificarOrdem}>
        Verificar
      </button>

      {feedbackTipo && (
        <FeedbackModal tipo={feedbackTipo} onClose={() => setFeedbackTipo(null)} />
      )}
    </div>
  );
}

export default PalavraLonga;
