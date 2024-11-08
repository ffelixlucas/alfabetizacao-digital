import React from 'react';
import './InteractiveMap.css';
import trilhaImage from '../../assets/trilha.webp';

function InteractiveMap({ missoesDesbloqueadas }) {
  const fases = [
    { id: 1, icon: '🔤', info: 'Fase 1', path: '/fase-1', x: '5%', y: '18%' },
    { id: 2, icon: '✏️', info: 'Fase 2', path: '/fase-2', x: '27%', y: '41%' },
    { id: 3, icon: '🧩', info: 'Fase 3', path: '/fase-3', x: '68%', y: '20%' },
    { id: 4, icon: '📚', info: 'Fase 4', path: '/fase-4', x: '81%', y: '43%' },
    { id: 5, icon: '🎧', info: 'Fase 5', path: '/fase-5', x: '80%', y: '70%' },
  ];

  return (
    <div className="map-container" style={{ backgroundImage: `url(${trilhaImage})` }}>
      {fases.map((fase) => {
        // Lógica para definir a classe CSS
        let classe = 'bloqueada';
        if (missoesDesbloqueadas.includes(fase.id)) {
          classe = 'concluida';
        } else if (fase.id === 1 || missoesDesbloqueadas.includes(fase.id - 1)) {
          classe = 'desbloqueada';
        }

        return (
          <div
            key={fase.id}
            className={`trail-step ${classe}`}
            style={{ top: fase.y, left: fase.x }}
          >
            <span className="icon">{fase.icon}</span>
            <a href={classe === 'bloqueada' ? '#' : fase.path} className="info-link">
              {fase.info}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default InteractiveMap;
