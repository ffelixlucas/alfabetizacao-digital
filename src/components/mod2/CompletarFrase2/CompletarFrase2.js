// src/components/mod2/CompletarFrase2.js

import React, { useState } from 'react';
import './CompletarFrase.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import gatoDormindo from '../../../assets/gatodormindo.jpg';

const CompletarFrase2 = ({ onCompletion }) => {
  const fraseParte1 = "O gato está";
  const respostaCorreta = "dormindo";
  const opcoes = ["dormindo", "voando", "brilhando", "cantando"]; // Opções que deixam clara a resposta correta

  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const verificarResposta = () => {
    if (respostaSelecionada === respostaCorreta) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
      setRespostaSelecionada(null); // Reseta a resposta selecionada se estiver errada
    }
  };

  return (
    <div className="completar-frase-container">
      <h2>Complete a frase:</h2>
      <img src={gatoDormindo} alt="Gato dormindo" className="imagem-gato" />
      <p className="frase">
        {fraseParte1} <span className="lacuna">{respostaSelecionada || '_______'}</span>.
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

export default CompletarFrase2;
