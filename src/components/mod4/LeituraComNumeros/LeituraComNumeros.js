// src/components/mod4/LeituraComNumeros.js

import React, { useState, useRef } from 'react';
import '../AvaliacaoLeitura/AvaliacaoLeitura.css';
import { FaMicrophone, FaStop } from 'react-icons/fa';
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

  // Função de avaliação mais flexível
  const avaliarLeitura = (texto) => {
    const similar = compararFrase(texto, frase);
    if (similar) {
      setFeedbackTipo('acerto');
      if (onCompletion) {
        onCompletion();
      }
    } else {
      setFeedbackTipo('erro');
    }
  };

  // Função para comparar frases com uma margem de erro
  const compararFrase = (textoUsuario, textoCorreto) => {
    const palavrasUsuario = textoUsuario.split(' ');
    const palavrasCorretas = textoCorreto.split(' ');
    let acertos = 0;

    palavrasCorretas.forEach((palavra, index) => {
      if (palavrasUsuario[index] === palavra) {
        acertos += 1;
      }
    });

    // Retorna verdadeiro se o número de acertos for acima de 80% do total de palavras
    return acertos / palavrasCorretas.length >= 0.8;
  };

  return (
    <div className={`avaliacao-container ${feedbackTipo === 'erro' ? 'erro' : feedbackTipo === 'acerto' ? 'acerto' : ''}`}>
      <h3>Leia a frase em voz alta:</h3>
      <p>{fraseComEmojis}</p>
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
