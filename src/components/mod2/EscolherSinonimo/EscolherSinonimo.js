// src/components/mod2/EscolherSinonimo.js

import React, { useState } from 'react';
import './CompletarFrase.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import criancaFeliz from '../../../assets/criancafeliz.jpg';

const EscolherSinonimo = ({ onCompletion }) => {
  const respostaCorreta = "Feliz";
  const opcoes = ["Feliz", "triste", "verde", "doente"];

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
      <img src={criancaFeliz} alt="Criança feliz" className="imagem-crianca" />
      <p className="frase">
        A criança estava muito <span className="lacuna">{respostaSelecionada || '____'}</span> depois da festa.
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

export default EscolherSinonimo;
