import React, { useState } from 'react';
import './Alfabeto.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import Modal from '../../FeedbackModal/Modal';

function Alfabeto({ onCompletion }) {
  const [letras, setLetras] = useState(['C', 'B', 'D', 'A']);
  const [posicoes, setPosicoes] = useState([null, null, null, null]);
  const [arrastando, setArrastando] = useState(null);
  const [feedbackTipo, setFeedbackTipo] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(true);

  const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);

  const handleDragStart = (index) => setArrastando(index);

  const handleDrop = (index) => {
    if (arrastando !== null || posicoes[index] !== null) {
      const novasPosicoes = [...posicoes];

      if (novasPosicoes[index] === null) {
        novasPosicoes[index] = letras[arrastando];
        const novasLetras = [...letras];
        novasLetras[arrastando] = null;
        setLetras(novasLetras);
      } else {
        const novasLetras = [...letras];
        novasLetras[letras.indexOf(null)] = novasPosicoes[index];
        novasPosicoes[index] = null;
        setLetras(novasLetras);
      }

      setPosicoes(novasPosicoes);
      setArrastando(null);
    }
  };

  const verificarOrdem = () => {
    if (JSON.stringify(posicoes) === JSON.stringify(['A', 'B', 'C', 'D'])) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="alfabeto-container">
      {modalVisivel && <Modal onClose={() => setModalVisivel(false)} isMobile={isMobile} />}
      <h2>Organize as letras corretamente!</h2>
      <div className="quadrados-container">
        {posicoes.map((letra, index) => (
          <div
            key={index}
            className="quadrado"
            onClick={() => handleDrop(index)}
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
              onClick={() => handleDragStart(index)}
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

export default Alfabeto;
