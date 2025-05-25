import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';
import ChatWidget from './components/ChatWidget';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CryptoContext>
        <App />
        <ChatWidget /> 
      </CryptoContext>
    </BrowserRouter>
  </React.StrictMode>
);

