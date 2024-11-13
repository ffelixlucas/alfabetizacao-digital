import React, { useState, useEffect } from 'react';
import './InteractiveMap.css';
import trilhaImage from '../../assets/trilha.webp';

function InteractiveMap({ missoesDesbloqueadas = [] }) {
  const fases = [
    { id: 1, icon: '', info: '1', path: '/fase-1',  y:'30%',  x:'26%' },
    { id: 2, icon: '', info: '', path: '/fase-2',  y:'34%',  x:'30%' },
    { id: 3, icon: '', info: '', path: '/fase-3',  y:'40%',  x:'33%' },
    { id: 4, icon: '', info: '2', path: '/fase-4',  y:'46%',  x:'36%' },
    { id: 5, icon: '', info: '', path: '/fase-5',  y:'48%',  x:'41%' },
    { id: 6, icon: '', info: '', path: '/fase-6',  y:'44%',  x:'45%' },
    { id: 7, icon: '', info: '3', path: '/fase-7',  y:'37%',  x:'47%' },
    { id: 8, icon: '', info: '', path: '/fase-8',  y:'30%',  x:'51%' },
    { id: 9, icon: '', info: '', path: '/fase-9',  y:'34%',  x:'59%' },
    { id: 10, icon: '', info: '4', path: '/fase-10',  y:'34%',  x:'64%' },
    { id: 11, icon: '', info: '', path: '/fase-11',  y:'38%',  x:'68%' },
    { id: 12, icon: '', info: '', path: '/fase-12',  y:'46%',  x:'69%' },
    { id: 13, icon: '', info: '5', path: '/fase-13',  y:'54%',  x:'68%' },
    { id: 14, icon: '', info: '', path: '/fase-14',  y:'62%',  x:'67%' },
    { id: 15, icon: '', info: '', path: '/fase-15',  y:'70%',  x:'68%' },
  ];
  

  const [ultimaFaseConcluida, setUltimaFaseConcluida] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  const isFaseDesbloqueada = (faseId) => {
    return faseId <= ultimaFaseConcluida;
  };

  useEffect(() => {
    if (missoesDesbloqueadas.length > 0) {
      setUltimaFaseConcluida(Math.max(...missoesDesbloqueadas));
    }

    if (missoesDesbloqueadas.length === 1 && missoesDesbloqueadas[0] === 1) {
      setShowWelcome(true);
    }
  }, [missoesDesbloqueadas]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <div className="map-wrapper">
      {showWelcome && (
        <div className="welcome-message">
          <h1>Alfabetização Digital</h1>
          <p>Faça a tarefa em verde para liberar a próxima fase</p>
          <button onClick={handleCloseWelcome} className="ok-button">OK</button>
        </div>
      )}
      <div className="map-container">
        {fases.map((fase) => {
          const classe = isFaseDesbloqueada(fase.id) ? 'desbloqueada' : 'bloqueada';
          const isUltimoDesbloqueado = fase.id === ultimaFaseConcluida;

          return (
            <a
              key={fase.id}
              href={classe === 'bloqueada' ? '#' : fase.path}
              className={`trail-step ${classe} ${isUltimoDesbloqueado ? 'ultimo-desbloqueado' : ''}`}
              style={{ top: fase.y, left: fase.x }}
              onClick={(e) => {
                if (classe === 'bloqueada') e.preventDefault();
              }}
            >
              <span className="icon">{fase.icon}</span>
              <span className="info-link">{fase.info}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default InteractiveMap;