import React, { useState } from 'react';
import './EncontrePalavra.css';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import casaImg from '../../assets/casa.png'; // Caminho relativo para a imagem

const EncontrePalavra = ({ onCompletion, palavraCorreta, opcoes }) => {
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const verificarResposta = (palavra) => {
    setRespostaSelecionada(palavra);
    if (palavra === palavraCorreta) {
      setFeedbackTipo('acerto');
      onCompletion(); // Chama a função para desbloquear a próxima fase
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className="desafio-container">
      <h2>Encontre a palavra correspondente à imagem:</h2>
      <div className="imagem-container">
        <img className='Img-Casa' src={casaImg} alt="Casa" />
      </div>

      <div className="opcoes-palavras">
        {opcoes.map((palavra, index) => (
          <button
            key={index}
            className={`opcao-palavra ${
              respostaSelecionada === palavra ? (palavra === palavraCorreta ? 'correta' : 'incorreta') : ''
            }`}
            onClick={() => verificarResposta(palavra)}
            disabled={respostaSelecionada !== null}
          >
            {palavra}
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

export default EncontrePalavra;
