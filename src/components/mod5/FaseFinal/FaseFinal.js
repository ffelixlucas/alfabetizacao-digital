import React, { useState, useEffect } from 'react';
import './FaseFinal.css';
import successSound from '../../../assets/sounds/sucess.mp3';
import starImage from '../../../assets/star.png'; // Exemplo de ícone de estrela
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';

const FaseFinal = () => {
  const navigate = useNavigate();
  const palavraFinal = "PARABENS";
  const [letrasDisponiveis, setLetrasDisponiveis] = useState(
    palavraFinal.slice(3, 6).split('').sort(() => Math.random() - 0.5) // Somente "ABE" fica disponível para arrastar
  );
  const [resposta, setResposta] = useState(['P', 'A', 'R', '', '', '', 'N', 'S']);
  const [feedbackTipo, setFeedbackTipo] = useState(null);

  const handleLetraClick = (index) => {
    const letraSelecionada = letrasDisponiveis[index];
    if (letraSelecionada) {
      const novaResposta = [...resposta];
      const posicao = novaResposta.indexOf('');
      novaResposta[posicao] = letraSelecionada;

      setResposta(novaResposta);

      const novasLetras = [...letrasDisponiveis];
      novasLetras[index] = null; // Remove a letra selecionada
      setLetrasDisponiveis(novasLetras);
    }
  };

  const handleLetraTroca = (index) => {
    const letraErrada = resposta[index];
    if (letraErrada && palavraFinal[index] !== letraErrada) {
      const novaResposta = [...resposta];
      novaResposta[index] = ''; // Remove a letra errada

      const novasLetras = [...letrasDisponiveis];
      const posicaoLivre = novasLetras.indexOf(null);
      if (posicaoLivre !== -1) {
        novasLetras[posicaoLivre] = letraErrada; // Adiciona a letra errada de volta às disponíveis
      }

      setResposta(novaResposta);
      setLetrasDisponiveis(novasLetras);
    }
  };

  const verificarResposta = () => {
    if (resposta.join('') === palavraFinal) {
      setFeedbackTipo('acerto');
      const audio = new Audio(successSound);
      audio.play();
    } else {
      setFeedbackTipo('erro');
    }
  };

  useEffect(() => {
    if (!resposta.includes('')) {
      verificarResposta();
    }
  }, [resposta]);

  const handleFinalizarClick = () => {
    navigate('/'); // Redireciona para o mapa interativo
  };

  const handleRefazer = () => {
    setResposta(['P', 'A', 'R', '', '', '', 'N', 'S']);
    setLetrasDisponiveis(palavraFinal.slice(3, 6).split('').sort(() => Math.random() - 0.5));
    setFeedbackTipo(null); // Fecha o modal e permite tentar novamente
  };

  return (
    <div className="fase-final-container">
      <h2>Forme a Palavra para Concluir a Fase!</h2>
      <div className="espaco-palavra">
        {resposta.map((letra, index) => (
          <span
            key={index}
            className={`letra-preenchida ${palavraFinal[index] !== letra && letra ? 'letra-errada' : ''}`}
            onClick={() => handleLetraTroca(index)} // Permite trocar letras erradas
          >
            {letra}
          </span>
        ))}
      </div>

      <div className="letras-disponiveis">
        {letrasDisponiveis.map((letra, index) => (
          <div
            key={index}
            className={`letra-bloco ${!letra ? 'invisivel' : ''}`}
            onClick={() => handleLetraClick(index)}
          >
            {letra}
          </div>
        ))}
      </div>

      {feedbackTipo === 'acerto' && (
        <div className="mensagem-final">
          <h3>Parabéns! Você chegou até o final!</h3>
          <p>Isso mostra o quanto você é inteligente!</p>
          <div className="estrelas">
            <img src={starImage} alt="estrela" className="estrela" />
            <img src={starImage} alt="estrela" className="estrela" />
            <img src={starImage} alt="estrela" className="estrela" />
          </div>
          <button className="btn-finalizar" onClick={handleFinalizarClick}>
            Finalizar
          </button>
        </div>
      )}

      {feedbackTipo === 'erro' && (
        <FeedbackModal tipo="erro" onClose={handleRefazer} />
      )}
    </div>
  );
};

export default FaseFinal;
