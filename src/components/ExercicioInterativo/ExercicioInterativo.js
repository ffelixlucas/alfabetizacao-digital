import React, { useState } from 'react';
import './ExercicioInterativo.css';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

const ExercicioInterativo = ({ onCompletion }) => {
  const palavraCorreta = "casa"; // Palavra simples e didática
  const [letrasDisponiveis, setLetrasDisponiveis] = useState(palavraCorreta.split('').sort(() => Math.random() - 0.5));
  const [resposta, setResposta] = useState([]);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handleLetraClick = (index) => {
    const letraSelecionada = letrasDisponiveis[index];
    if (letraSelecionada) {
      setResposta([...resposta, letraSelecionada]);
      const novasLetras = [...letrasDisponiveis];
      novasLetras[index] = null; // Marca a letra como usada
      setLetrasDisponiveis(novasLetras);
    }
  };

  const verificarResposta = () => {
    if (resposta.join('') === palavraCorreta) {
      setFeedbackTipo('acerto');
      onCompletion(); // Chama a função para desbloquear a próxima fase
    } else {
      setFeedbackTipo('erro');
    }
  };

  const reset = () => {
    setResposta([]);
    setLetrasDisponiveis(palavraCorreta.split('').sort(() => Math.random() - 0.5));
    setFeedbackTipo(null);
  };

  return (
    <div className="exercicio-container">
      <h2>Monte a Palavra:</h2>
      <div className="espaco-palavra">
        {resposta.map((letra, index) => (
          <span key={index} className="letra-preenchida">{letra}</span>
        ))}
      </div>

      <div className="letras-disponiveis">
        {letrasDisponiveis.map((letra, index) => (
          <div
            key={index}
            className={`letra-bloco ${!letra ? 'invisivel' : ''}`}
            onClick={() => handleLetraClick(index)}
          >
            {letra}
          </div>
        ))}
      </div>

      <button className="btn-verificar" onClick={verificarResposta} disabled={resposta.length < palavraCorreta.length}>
        Verificar
      </button>

      {feedbackTipo && (
        <FeedbackModal
          tipo={feedbackTipo}
          onClose={() => {
            if (feedbackTipo === 'acerto') {
              onCompletion();
            } else {
              reset(); // Tenta novamente se a resposta estiver errada
            }
          }}
        />
      )}
    </div>
  );
};

export default ExercicioInterativo;
