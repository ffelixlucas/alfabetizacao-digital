import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InteractiveMap from '../components/InteractiveMap/InteractiveMap';
import Alfabeto from '../components/Alfabeto/Alfabeto';
import CompletarFrase from '../components/CompletarFrase/CompletarFrase';
import ExercicioInterativo from '../components/ExercicioInterativo/ExercicioInterativo';
import AvaliacaoLeitura from '../components/AvaliacaoLeitura/AvaliacaoLeitura';
import EncontrePalavra from '../components/EncontrePalavra/EncontrePalavra';

const AppRoutes = () => {
  const [missoesDesbloqueadas, setMissoesDesbloqueadas] = useState([1]);

  const handleCompletion = (faseCompleta) => {
    console.log(`Fase ${faseCompleta} completada.`);
    if (!missoesDesbloqueadas.includes(faseCompleta + 1)) {
      console.log(`Desbloqueando a fase ${faseCompleta + 1}`);
      const novasMissoes = [...missoesDesbloqueadas, faseCompleta + 1];
      setMissoesDesbloqueadas(novasMissoes);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<InteractiveMap missoesDesbloqueadas={missoesDesbloqueadas} />}
        />
        <Route
          path="/fase-1"
          element={<Alfabeto onCompletion={() => handleCompletion(1)} />}
        />
        <Route
          path="/fase-2"
          element={<CompletarFrase onCompletion={() => handleCompletion(2)} />}
        />
        <Route
          path="/fase-3"
          element={<ExercicioInterativo onCompletion={() => handleCompletion(3)} />}
        />
        <Route
          path="/fase-4"
          element={<AvaliacaoLeitura onCompletion={() => handleCompletion(4)} />}
        />
        <Route
          path="/fase-5"
          element={
            <EncontrePalavra
              onCompletion={() => handleCompletion(5)}
              imagemSrc="/assets/casa.png"
              palavraCorreta="CASA"
              opcoes={['CASA', 'MESA', 'CARRO']}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
