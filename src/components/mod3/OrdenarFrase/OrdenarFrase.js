// src/components/mod3/OrdenarFrase.js

import React, { useState } from 'react';
import './OrdenarFrase.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const OrdenarFrase = ({ onCompletion }) => {
  const fraseCorreta = ["Minha", "casa", "é", "bonita"];
  const [palavrasDisponiveis, setPalavrasDisponiveis] = useState(
    [...fraseCorreta].sort(() => Math.random() - 0.5)
  );
  const [resposta, setResposta] = useState([]);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handlePalavraClick = (index) => {
    const palavraSelecionada = palavrasDisponiveis[index];
    if (palavraSelecionada) {
      setResposta([...resposta, palavraSelecionada]);
      const novasPalavras = [...palavrasDisponiveis];
      novasPalavras[index] = null;
      setPalavrasDisponiveis(novasPalavras);
    }
  };

  const verificarResposta = () => {
    if (resposta.join(" ") === fraseCorreta.join(" ")) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
      setResposta([]);
      setPalavrasDisponiveis([...fraseCorreta].sort(() => Math.random() - 0.5));
    }
  };

  return (
    <div className="ordenar-frase-container">
      <h2>Forme a Frase Correta:</h2>
      <div className="espaco-frase">
        {resposta.map((palavra, index) => (
          <span key={index} className="palavra-preenchida">{palavra}</span>
        ))}
      </div>
      <div className="palavras-disponiveis">
        {palavrasDisponiveis.map((palavra, index) => (
          <div
            key={index}
            className={`palavra-bloco ${!palavra ? 'invisivel' : ''}`}
            onClick={() => handlePalavraClick(index)}
          >
            {palavra}
          </div>
        ))}
      </div>
      <button className="btn-verificar" onClick={verificarResposta} disabled={resposta.length < fraseCorreta.length}>
        Verificar
      </button>

      {feedbackTipo && (
        <FeedbackModal
          tipo={feedbackTipo}
          onClose={() => setFeedbackTipo(null)}
        />
      )}
    </div>
  );
};

export default OrdenarFrase;
