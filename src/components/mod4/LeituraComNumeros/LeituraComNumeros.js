import React, { useState, useRef } from 'react';
import '../AvaliacaoLeitura/AvaliacaoLeitura.css';
import { FaMicrophone } from 'react-icons/fa';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const LeituraComNumeros = ({ onCompletion }) => {
  const [resultado, setResultado] = useState('');
  const [feedbackTipo, setFeedbackTipo] = useState(null);
  const [gravando, setGravando] = useState(false);

  // Frase exibida com emojis
  const fraseComEmojis = 'Pedro comprou 🍎 e 🍌 no mercado';

  // Frase esperada para a validação (sem emojis, para evitar problemas no reconhecimento)
  const frase = 'pedro comprou maçã e banana no mercado';

  const recognitionRef = useRef(null);

  const iniciarReconhecimento = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de fala. Use o botão "Concluir sem microfone" para continuar.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false; // Para automaticamente após a fala
    recognition.interimResults = false;
    recognition.lang = 'pt-BR';

    recognition.onstart = () => {
      setResultado('');
      setFeedbackTipo(null);
      setGravando(true);
    };

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript.toLowerCase().trim();
      setResultado(texto);
      setGravando(false);
    };

    recognition.onerror = () => {
      setFeedbackTipo('erro');
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
    if (onCompletion) onCompletion(); // Avança para o próximo desafio
  };

  return (
    <div className={`avaliacao-container ${feedbackTipo === 'erro' ? 'erro' : feedbackTipo === 'acerto' ? 'acerto' : ''}`}>
      <h3>Leia a frase em voz alta:</h3>
      <p>{fraseComEmojis}</p>
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
              onCompletion();
            } else {
              setFeedbackTipo(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default LeituraComNumeros;
