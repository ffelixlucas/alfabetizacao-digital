import React, { useState } from 'react';
import './AvaliacaoLeitura.css';
import { FaMicrophone } from 'react-icons/fa';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const AvaliacaoLeitura = ({ onCompletion }) => {
  const [resultado, setResultado] = useState('');
  const [feedbackTipo, setFeedbackTipo] = useState(null);
  const [gravando, setGravando] = useState(false);
  const [frase] = useState('Maria foi para a escola mais cedo');

  const iniciarReconhecimento = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de fala. Use o botão "Concluir sem microfone" para continuar.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'pt-BR';

    recognition.onstart = () => {
      setResultado('');
      setFeedbackTipo(null);
      setGravando(true);
    };

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript.trim();
      setResultado(texto);
      setGravando(false);
    };

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento:', event.error);
      setGravando(false);
    };

    recognition.onend = () => {
      setGravando(false);
    };

    recognition.start();
  };

  const verificarLeitura = () => {
    const textoLimpo = resultado.toLowerCase().replace(/[\s.,!?]/g, '');
    const fraseLimpa = frase.toLowerCase().replace(/[\s.,!?]/g, '');

    if (textoLimpo === fraseLimpa) {
      setFeedbackTipo('acerto');
      if (onCompletion) onCompletion();
    } else {
      setFeedbackTipo('erro');
    }
  };

  const concluirSemMicrofone = () => {
    setFeedbackTipo('acerto'); // Marca como correto
    if (onCompletion) onCompletion(); // Vai para o próximo desafio
  };

  return (
    <div className={`avaliacao-container ${feedbackTipo === 'erro' ? 'erro' : feedbackTipo === 'acerto' ? 'acerto' : ''}`}>
      <h3>Leia a frase em voz alta:</h3>
      <p>{frase}</p>
      <div>
        <button onClick={iniciarReconhecimento} disabled={gravando}>
          <FaMicrophone size={30} /> Falar
        </button>
        <button onClick={verificarLeitura} disabled={!resultado}>
          Verificar
        </button>
        <button onClick={concluirSemMicrofone}>
          Concluir sem Microfone
        </button>
      </div>
      {resultado && (
        <div>
          <h4>Sua leitura:</h4>
          <p>{resultado}</p>
        </div>
      )}

      {feedbackTipo && (
        <FeedbackModal
          tipo={feedbackTipo}
          onClose={() => {
            if (feedbackTipo === 'acerto') {
              onCompletion(); // Vai para o próximo desafio
            } else {
              setFeedbackTipo(null); // Permite tentar novamente
            }
          }}
        />
      )}
    </div>
  );
};

export default AvaliacaoLeitura;
