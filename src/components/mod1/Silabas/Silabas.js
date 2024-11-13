// src/components/mod2/Silabas.js

import React, { useState } from 'react';
import './Silabas.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import cavaloImg from '../../../assets/cavalo.jpg';

function Silabas({ onCompletion }) {
  const [silabas, setSilabas] = useState(['CA', 'LO', 'VA']);
  const [posicoes, setPosicoes] = useState([null, null, null]);
  const [arrastando, setArrastando] = useState(null);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handleClick = (index) => {
    const novasPosicoes = [...posicoes];
    const novasSilabas = [...silabas];

    if (arrastando === null) {
      // Se já houver uma sílaba no quadrado clicado
      if (posicoes[index] !== null) {
        // Retorna a sílaba para a lista de opções
        const primeiraPosicaoLivre = novasSilabas.findIndex((s) => s === null);
        if (primeiraPosicaoLivre !== -1) {
          novasSilabas[primeiraPosicaoLivre] = novasPosicoes[index];
          novasPosicoes[index] = null; // Remove a sílaba do quadrado
        }
      }
    } else {
      // Caso esteja arrastando, move a sílaba para o quadrado clicado
      if (novasPosicoes[index] === null) {
        novasPosicoes[index] = silabas[arrastando];
        novasSilabas[arrastando] = null; // Remove a sílaba da lista de opções
        setArrastando(null); // Reseta o arrastando
      }
    }

    setPosicoes(novasPosicoes);
    setSilabas(novasSilabas);
  };

  const handleSilabaClick = (index) => {
    if (arrastando === index) {
      // Desseleciona a sílaba se clicar novamente nela
      setArrastando(null);
    } else {
      // Seleciona a sílaba para ser posicionada
      setArrastando(index);
    }
  };

  const handleDragStart = (index) => {
    setArrastando(index);
  };

  const handleDrop = (index) => {
    if (arrastando !== null) {
      const novasPosicoes = [...posicoes];
      const novasSilabas = [...silabas];

      // Caso o quadrado já tenha uma sílaba -> devolve-a para a lista de opções
      if (novasPosicoes[index] !== null) {
        const primeiraPosicaoLivre = novasSilabas.findIndex((s) => s === null);
        if (primeiraPosicaoLivre !== -1) {
          novasSilabas[primeiraPosicaoLivre] = novasPosicoes[index];
        }
      }

      // Move a sílaba arrastada para o quadrado
      novasPosicoes[index] = silabas[arrastando];
      novasSilabas[arrastando] = null; // Remove a sílaba da lista de opções

      setPosicoes(novasPosicoes);
      setSilabas(novasSilabas);
      setArrastando(null); // Reseta o estado de arrastando
    }
  };

  const verificarOrdem = () => {
    if (JSON.stringify(posicoes) === JSON.stringify(['CA', 'VA', 'LO'])) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="silabas-container">
      <h2>Forme a palavra corretamente!</h2>
      <img src={cavaloImg} alt="Imagem de um cavalo" className="imagem-cavalo" />
      <div className="quadrados-container">
        {posicoes.map((silaba, index) => (
          <div
            key={index}
            className="quadrado"
            onClick={() => handleClick(index)} // Suporte a cliques
            onDragOver={(e) => e.preventDefault()} // Permite o arrastar e soltar
            onDrop={() => handleDrop(index)} // Solta a sílaba no quadrado
          >
            {silaba ? silaba : ''}
          </div>
        ))}
      </div>

      <div className="silabas-opcoes">
        {silabas.map((silaba, index) => (
          silaba !== null && (
            <div
              key={index}
              className={`silaba ${arrastando === index ? 'selecionada' : ''}`}
              onClick={() => handleSilabaClick(index)} // Seleciona ou desseleciona a sílaba
              draggable // Permite arrastar no desktop
              onDragStart={() => handleDragStart(index)} // Inicia o arraste
            >
              {silaba}
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

export default Silabas;
