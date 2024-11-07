import React, { useState } from 'react';
import './Alfabeto.css';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

function Alfabeto({ onCompletion }) {
  const [letras, setLetras] = useState(['A', 'B', 'C', 'D']);
  const [posicoes, setPosicoes] = useState([null, null, null, null]);
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
      novasLetras[arrastando] = null; // Remove a letra que foi arrastada
      setLetras(novasLetras);

      setArrastando(null);
    }
  };

  const verificarOrdem = () => {
    if (JSON.stringify(posicoes) === JSON.stringify(['A', 'B', 'C', 'D'])) {
      setFeedbackTipo('acerto');
      onCompletion(); // Desbloqueia a próxima fase
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="alfabeto-container">
      <h2>Organize as letras corretamente!</h2>
      <div className="quadrados-container">
        {posicoes.map((letra, index) => (
          <div
            key={index}
            className="quadrado"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {letra ? letra : '🟦'}
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

export default Alfabeto;
