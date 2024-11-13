import React, { useState, useRef } from 'react';
import './AvaliacaoLeitura.css';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const AvaliacaoLeitura = ({ onCompletion }) => {
  const [resultado, setResultado] = useState('');
  const [feedbackTipo, setFeedbackTipo] = useState(null);
  const [gravando, setGravando] = useState(false);
  const [frase] = useState('Maria foi para a escola mais cedo');
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  const iniciarReconhecimento = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setResultado('');
      setFeedbackTipo(null);
      setGravando(true);
    };

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript.toLowerCase().trim();
      setResultado(texto);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (texto.length >= frase.length * 0.8) {
          avaliarLeitura(texto);
          pararReconhecimento();
        }
      }, 2500);
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

  const pararReconhecimento = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setGravando(false);
    }
    clearTimeout(timeoutRef.current);
  };

  const avaliarLeitura = (texto) => {
    if (texto === frase.toLowerCase()) {
      setFeedbackTipo('acerto');
      if (onCompletion) {
        onCompletion();
      }
    } else {
      setFeedbackTipo('erro');
    }
  };

  return (
    <div className={`avaliacao-container ${feedbackTipo === 'erro' ? 'erro' : feedbackTipo === 'acerto' ? 'acerto' : ''}`}>
      <h3>Leia a frase em voz alta:</h3>
      <p>{frase}</p>
      <div>
        <button onClick={iniciarReconhecimento} disabled={gravando}>
          <FaMicrophone size={30} /> Falar
        </button>
        <button onClick={pararReconhecimento} disabled={!gravando} style={{ backgroundColor: 'red', color: 'white' }}>
          <FaStop size={30} /> Parar
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
