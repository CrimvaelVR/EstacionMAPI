import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-dotenv';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-blue-900	bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,29,184,0.9),rgba(10,0,86,0))]"></div>
    <App />
  </React.StrictMode>
);
