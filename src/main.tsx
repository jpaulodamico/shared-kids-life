
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Adiciona um elemento de carregamento inicial
const rootElement = document.getElementById("root")!;
const loadingHtml = `
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
    <div style="border-radius: 50%; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
  </div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`;

rootElement.innerHTML = loadingHtml;

// Inicializa o app após um breve atraso
setTimeout(() => {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 100);
