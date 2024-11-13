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

  const handleDragStart = (index) => {
    setArrastando(index);
  };

  const handleDrop = (index) => {
    if (arrastando !== null) {
      const novasPosicoes = [...posicoes];
      novasPosicoes[index] = silabas[arrastando];
      setPosicoes(novasPosicoes);

      const novasSilabas = [...silabas];
      novasSilabas[arrastando] = null;
      setSilabas(novasSilabas);

      setArrastando(null);
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
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
              className="silaba"
              draggable
              onDragStart={() => handleDragStart(index)}
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
