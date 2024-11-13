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

  const handleDragStart = (index) => {
    setArrastando(index);
  };

  const handleDrop = (index) => {
    if (arrastando !== null) {
      const novasPosicoes = [...posicoes];
      novasPosicoes[index] = letras[arrastando];
      setPosicoes(novasPosicoes);

      const novasLetras = [...letras];
      novasLetras[arrastando] = null;
      setLetras(novasLetras);

      setArrastando(null);
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
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
              className="letra"
              draggable
              onDragStart={() => handleDragStart(index)}
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
