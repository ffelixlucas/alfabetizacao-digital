import React from 'react';
import './InteractiveMap.css';
import trilhaImage from '../../assets/trilha.webp';

function InteractiveMap({ missoesDesbloqueadas }) {
  const fases = [
    { id: 1, icon: '🔤', info: 'Fase 1', path: '/fase-1', desbloqueada: true, x: '50px', y: '100px' },
    { id: 2, icon: '✏️', info: 'Fase 2', path: '/fase-2', desbloqueada: missoesDesbloqueadas.includes(2), x: '226px', y: '225px' },
    { id: 3, icon: '🧩', info: 'Fase 3', path: '/fase-3', desbloqueada: missoesDesbloqueadas.includes(3), x: '455px', y: '66px' },
    { id: 4, icon: '📚', info: 'Fase 4', path: '/fase-4', desbloqueada: missoesDesbloqueadas.includes(4), x: '757px', y: '198px' },
    { id: 5, icon: '🎧', info: 'Fase 5', path: '/fase-5', desbloqueada: missoesDesbloqueadas.includes(5), x: '700px', y: '409px' },
  ];

  return (
    <div className="map-container" style={{ backgroundImage: `url(${trilhaImage})` }}>
      <div className="trail-container">
        {fases.map((fase) => (
          <div
            key={fase.id}
            className={`trail-step ${fase.desbloqueada ? 'desbloqueada' : 'bloqueada'}`}
            style={{ top: fase.y, left: fase.x }}
          >
            <span>{fase.icon}</span>
            <a href={fase.desbloqueada ? fase.path : '#'}>{fase.info}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveMap;
