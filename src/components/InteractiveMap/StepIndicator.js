import React from 'react';
import { Link } from 'react-router-dom';
import './InteractiveMap.css';

function StepIndicator({ id, icon, info, path, desbloqueada, style }) {
  return (
    <Link
      to={desbloqueada ? path : '#'}
      className={`trail-step ${desbloqueada ? '' : 'bloqueada'}`}
      onClick={(e) => !desbloqueada && e.preventDefault()}
      style={style} // Aplicando estilo de posicionamento diretamente aqui
    >
      <div className="trail-icon">
        {icon}
        <div className="info-bubble">{info}</div>
      </div>
    </Link>
  );
}

export default StepIndicator;
