import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // ou votre fichier CSS
import App from './App'; // Votre composant principal
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Si vous souhaitez mesurer les performances
reportWebVitals();
