import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InteractiveMap from '../components/InteractiveMap/InteractiveMap';
import Alfabeto from '../components/mod1/Alfabeto/Alfabeto';
import Silabas from '../components/mod1/Silabas/Silabas';
import PalavraLonga from '../components/mod1/PalavraLonga/PalavraLonga';
import CompletarFrase from '../components/mod2/CompletarFrase/CompletarFrase';
import CompletarFrase2 from '../components/mod2/CompletarFrase2/CompletarFrase2';
import EscolherSinonimo from '../components/mod2/EscolherSinonimo/EscolherSinonimo';
import ExercicioInterativo from '../components/mod3/ExercicioInterativo/ExercicioInterativo';
import AssociacaoPalavraImagem from '../components/mod3/AssociacaoPalavraImagem/AssociacaoPalavraImagem';
import OrdenarFrase from '../components/mod3/OrdenarFrase/OrdenarFrase';
import AvaliacaoLeitura from '../components/mod4/AvaliacaoLeitura/AvaliacaoLeitura';
import LeituraComNumeros from '../components/mod4/LeituraComNumeros/LeituraComNumeros';
import LeituraComCoresEAnimais from '../components/mod4/LeituraComCoresEAnimais/LeituraComCoresEAnimais';
import Cruzadinhas from '../components/mod5/OrganizeHistoria/OrganizeHistoria';
import CacaPalavras from '../components/mod5/CacaPalavras/CacaPalavras';
import FaseFinal from '../components/mod5/FaseFinal/FaseFinal' ;

const AppRoutes = () => {
  const [missoesDesbloqueadas, setMissoesDesbloqueadas] = useState([1]);

  const handleCompletion = (faseCompleta) => {
    if (!missoesDesbloqueadas.includes(faseCompleta + 1)) {
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
          element={<Silabas onCompletion={() => handleCompletion(2)} />}
        />
        <Route
          path="/fase-3"
          element={<PalavraLonga onCompletion={() => handleCompletion(3)} />}
        />
        <Route
          path="/fase-4"
          element={<CompletarFrase onCompletion={() => handleCompletion(4)} />}
        />
        <Route
          path="/fase-5"
          element={<CompletarFrase2 onCompletion={() => handleCompletion(5)} />}
        />
        <Route
          path="/fase-6"
          element={<EscolherSinonimo onCompletion={() => handleCompletion(6)} />}
        />
        <Route
          path="/fase-7"
          element={<ExercicioInterativo onCompletion={() => handleCompletion(7)} />}
        />
        <Route
          path="/fase-8"
          element={<AssociacaoPalavraImagem onCompletion={() => handleCompletion(8)} />}
        />
        <Route
          path="/fase-9"
          element={<OrdenarFrase onCompletion={() => handleCompletion(9)} />}
        />
        <Route
          path="/fase-10"
          element={<AvaliacaoLeitura onCompletion={() => handleCompletion(10)} />}
        />
        <Route
          path="/fase-11"
          element={<LeituraComNumeros onCompletion={() => handleCompletion(11)} />}
        />
        <Route
          path="/fase-12"
          element={<LeituraComCoresEAnimais onCompletion={() => handleCompletion(12)} />}
        />
        <Route
          path="/fase-13"
          element={<Cruzadinhas onCompletion={() => handleCompletion(13)} />}
        />
        <Route
          path="/fase-14"
          element={<CacaPalavras onCompletion={() => handleCompletion(14)} />}
        />
        <Route
          path="/fase-15"
          element={<FaseFinal onCompletion={() => handleCompletion(15)} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
