import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container); // Crie a instância de root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
