import React, { useEffect } from 'react';
import './FeedbackModal.css';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import audioAcerto from '../../assets/sounds/acerto.mp3';
import audioErro from '../../assets/sounds/erro.mp3';

const FeedbackModal = ({ tipo, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let audio;
    if (tipo === 'acerto') {
      audio = new Audio(audioAcerto);
    } else if (tipo === 'erro') {
      audio = new Audio(audioErro);
    }

    if (audio) {
      audio.volume = 0.4; // Define o volume para 40% (reduzido em 60%)
      audio.play().catch(err => console.error(`Erro ao reproduzir áudio: ${err}`));
    }
  }, [tipo]);

  const handleButtonClick = () => {
    if (tipo === 'acerto') {
      navigate('/'); // Volta para o mapa
    } else {
      onClose(); // Fecha o modal e permite tentar novamente
    }
  };

  return (
    <div className={`feedback-modal ${tipo}`}>
      {tipo === 'acerto' && <Confetti />}
      <div className="feedback-content">
        <h2>{tipo === 'acerto' ? 'Você acertou!' : 'Ops! Tente novamente.'}</h2>
        <button onClick={handleButtonClick}>
          {tipo === 'acerto' ? 'Próximo Nível' : 'Tentar Novamente'}
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
