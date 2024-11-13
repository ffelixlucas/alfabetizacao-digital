import React from 'react';
import './Modal.css';

function Modal({ onClose, isMobile }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Como Jogar</h2>
        {isMobile ? (
          <p>
            <span role="img" aria-label="toque">👆</span> <strong>Toque</strong> na letra para selecioná-la e
            depois <strong>toque</strong> no quadradinho onde deseja colocá-la.
            <br />
            Para <strong>desfazer</strong>, toque na letra novamente no quadradinho!
          </p>
        ) : (
          <p>
            <span role="img" aria-label="arraste">🖱️</span> <strong>Clique e arraste</strong> uma letra
            para o quadradinho.
            <br />
            Para <strong>desfazer</strong>, clique na letra no quadradinho ou arraste outra por cima!
          </p>
        )}
        <button onClick={onClose}>Entendi</button>
      </div>
    </div>
  );
}

export default Modal;
