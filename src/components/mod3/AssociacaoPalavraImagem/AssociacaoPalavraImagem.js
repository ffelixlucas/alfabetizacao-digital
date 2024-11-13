// src/components/mod3/AssociacaoPalavraImagem.js

import React, { useState } from 'react';
import './AssociacaoPalavraImagem.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import florImg from '../../../assets/flor.jpg'; // Exemplo de imagem

const AssociacaoPalavraImagem = ({ onCompletion }) => {
  const palavraCorreta = "flor";
  const opcoes = ["flor", "casa", "bola", "gato"];
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handleOpcaoClick = (opcao) => {
    if (opcao === palavraCorreta) {
      setFeedbackTipo('acerto');
      onCompletion();
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="associacao-container">
      <h2>Escolha a Palavra que Descreve a Imagem:</h2>
      <img src={florImg} alt="Imagem de uma flor" className="imagem-associacao" />
      <div className="opcoes-palavras">
        {opcoes.map((opcao, index) => (
          <button
            key={index}
            className="opcao-palavra"
            onClick={() => handleOpcaoClick(opcao)}
          >
            {opcao}
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

export default AssociacaoPalavraImagem;
