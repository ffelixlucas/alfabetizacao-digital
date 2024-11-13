import React, { useState } from 'react';
import './CompletarFrase.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const CompletarFrase = ({ onCompletion }) => {
  const frase = "O sol é ___."; // Frase simples para completar
  const respostaCorreta = "quente";
  const opcoes = ["quente", "gelado", "verde", "molhado"];

  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const verificarResposta = () => {
    if (respostaSelecionada === respostaCorreta) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="completar-frase-container">
      <h2>Complete a frase:</h2>
      <p className="frase">
        O sol é <span className="lacuna">{respostaSelecionada || '___'}</span>.
      </p>

      <div className="opcoes-palavras">
        {opcoes.map((opcao, index) => (
          <button
            key={index}
            className={`opcao-palavra ${respostaSelecionada === opcao ? 'selecionada' : ''}`}
            onClick={() => setRespostaSelecionada(opcao)}
          >
            {opcao}
          </button>
        ))}
      </div>

      <button className="btn-verificar" onClick={verificarResposta} disabled={!respostaSelecionada}>
        Verificar
      </button>

      {feedbackTipo && (
        <FeedbackModal tipo={feedbackTipo} onClose={() => setFeedbackTipo(null)} />
      )}
    </div>
  );
};

export default CompletarFrase;
