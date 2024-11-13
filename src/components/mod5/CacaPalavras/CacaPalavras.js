import React, { useState, useEffect } from 'react';
import './CacaPalavras.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const CacaPalavras = ({ onCompletion }) => {
  const palavrasCorretas = ["CASA", "ARVORE", "CAVALO", "ELEFANTE"];
  const [selecionadas, setSelecionadas] = useState([]);
  const [palavrasEncontradas, setPalavrasEncontradas] = useState([]);
  const [letrasEncontradas, setLetrasEncontradas] = useState([]);
  const [arrastando, setArrastando] = useState(false);
  const [feedbackTipo, setFeedbackTipo] = useState(null);
  const [tempo, setTempo] = useState(0);
  const [indicePiscar, setIndicePiscar] = useState(null);

  const letras = [
    ["C", "A", "S", "A", "L", "M", "E", "E"],
    ["O", "S", "R", "R", "C", "Q", "L", "L"],
    ["A", "R", "V", "V", "R", "E", "B", "E"],
    ["C", "A", "V", "O", "L", "O", "B", "F"], 
    ["E", "L", "O", "R", "C", "T", "A", "A"],
    ["L", "X", "E", "E", "A", "N", "T", "N"],
    ["R", "C", "A", "V", "A", "L", "O", "T"],
    ["O", "P", "Q", "S", "T", "U", "V", "E"]
  ];

  const handleMouseDown = (letra, i, j) => {
    setArrastando(true);
    setSelecionadas([{ letra, i, j }]);
  };

  const handleMouseMove = (i, j) => {
    if (!arrastando) return;
    if (!selecionadas.find(sel => sel.i === i && sel.j === j)) {
      const letra = letras[i][j];
      setSelecionadas([...selecionadas, { letra, i, j }]);
    }
  };

  const handleMouseUp = () => {
    setArrastando(false);
    verificarResposta();
  };

  const handleTouchStart = (letra, i, j) => {
    setArrastando(true);
    setSelecionadas([{ letra, i, j }]);
  };

  const handleTouchMove = (event) => {
    if (!arrastando) return;

    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target && target.dataset && target.dataset.i && target.dataset.j) {
      const i = parseInt(target.dataset.i);
      const j = parseInt(target.dataset.j);

      if (!selecionadas.find(sel => sel.i === i && sel.j === j)) {
        const letra = letras[i][j];
        setSelecionadas([...selecionadas, { letra, i, j }]);
      }
    }
  };

  const handleTouchEnd = () => {
    setArrastando(false);
    verificarResposta();
  };

  const verificarResposta = () => {
    const palavraFormada = selecionadas.map(item => item.letra).join('');
    if (palavrasCorretas.includes(palavraFormada) && !palavrasEncontradas.includes(palavraFormada)) {
      setPalavrasEncontradas([...palavrasEncontradas, palavraFormada]);
      setFeedbackTipo('acerto');
      setLetrasEncontradas([...letrasEncontradas, ...selecionadas]);
    } else {
      setFeedbackTipo('erro');
    }
    setSelecionadas([]);
  };

  useEffect(() => {
    if (palavrasEncontradas.length === palavrasCorretas.length) {
      setFeedbackTipo('completo');
      const timer = setTimeout(onCompletion, 2000);
      return () => clearTimeout(timer);
    }
  }, [palavrasEncontradas, onCompletion]);

  useEffect(() => {
    const timer = setInterval(() => setTempo(t => t + 1), 1000);
    if (tempo % 20 === 0 && palavrasEncontradas.length < palavrasCorretas.length) {
      const proximaPalavra = palavrasCorretas[palavrasEncontradas.length];
      setIndicePiscar(proximaPalavra);
    }
    return () => clearInterval(timer);
  }, [tempo, palavrasEncontradas.length, palavrasCorretas]);

  return (
    <div className="caca-palavras-container">
      <h2>Encontre as Palavras:</h2>
      <ul className="lista-palavras">
        {palavrasCorretas.map((palavra, index) => (
          <li
            key={index}
            className={
              palavrasEncontradas.includes(palavra)
                ? 'palavra-encontrada'
                : indicePiscar === palavra
                ? 'palavra-dica'
                : ''
            }
          >
            {palavra}
          </li>
        ))}
      </ul>
      <div
        className="grade"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseUp={handleMouseUp} // Para desktop
      >
        {letras.map((linha, i) => (
          <div key={i} className="linha">
            {linha.map((letra, j) => {
              const isEncontrada = letrasEncontradas.find(l => l.i === i && l.j === j);
              return (
                <div
                  key={j}
                  id={`letra-${i}-${j}`}
                  data-i={i}
                  data-j={j}
                  className={`letra-botao ${isEncontrada ? 'palavra-correta' : ''} ${selecionadas.find(sel => sel.i === i && sel.j === j) ? 'selecionado' : ''}`}
                  onMouseDown={() => handleMouseDown(letra, i, j)} // Para desktop
                  onMouseMove={() => handleMouseMove(i, j)} // Para desktop
                  onTouchStart={() => handleTouchStart(letra, i, j)} // Para mobile
                >
                  {letra}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {feedbackTipo === 'completo' && (
        <FeedbackModal
          tipo="acerto"
          onClose={() => setFeedbackTipo(null)}
        />
      )}
    </div>
  );
};

export default CacaPalavras;
