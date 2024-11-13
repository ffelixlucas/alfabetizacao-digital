// src/components/mod5/OrganizeHistoria.js

import React, { useState } from 'react';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import './OrganizeHistoria.css';

const OrganizeHistoria = ({ onCompletion }) => {
  const historiaCorreta = [
    "Era uma vez uma borboleta colorida.",
    "Ela voou até uma flor e pousou delicadamente.",
    "Depois de descansar, voou de volta para o seu jardim."
  ];

  const [frasesEmbaralhadas, setFrasesEmbaralhadas] = useState(shuffleArray([...historiaCorreta]));
  const [sequenciaSelecionada, setSequenciaSelecionada] = useState([]);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handleFraseClick = (index) => {
    const novaSequencia = [...sequenciaSelecionada, frasesEmbaralhadas[index]];
    setSequenciaSelecionada(novaSequencia);

    if (novaSequencia.length === historiaCorreta.length) {
      verificarOrdem(novaSequencia);
    }
  };

  const verificarOrdem = (sequencia) => {
    if (JSON.stringify(sequencia) === JSON.stringify(historiaCorreta)) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
      resetarJogo();
    }
  };

  const resetarJogo = () => {
    setSequenciaSelecionada([]);
    setFrasesEmbaralhadas(shuffleArray([...historiaCorreta]));
  };

  return (
    <div className="organize-historia-container">
      <h2>Organize a história na sequência correta:</h2>
      <div className="frases-container">
        {frasesEmbaralhadas.map((frase, index) => (
          <button
            key={index}
            className={`frase-botao ${sequenciaSelecionada.includes(frase) ? 'selecionada' : ''}`}
            onClick={() => handleFraseClick(index)}
            disabled={sequenciaSelecionada.includes(frase)}
          >
            {frase}
          </button>
        ))}
      </div>

      {feedbackTipo && (
        <FeedbackModal
          tipo={feedbackTipo}
          onClose={() => setFeedbackTipo(null)}
        />
      )}
    </div>
  );
};

export default OrganizeHistoria;

// Função para embaralhar as frases
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
