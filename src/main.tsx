
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Set CSS variable for base path to support GitHub Pages
const baseUrl = import.meta.env.BASE_URL;
const starsBgPath = `${baseUrl}lovable-uploads/stars-bg.png`;
document.documentElement.style.setProperty('--stars-bg-url', `url('${starsBgPath}')`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
