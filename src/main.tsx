import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import Navbar from './components/Navbar.tsx';
import './index.css';
import { css } from '../styled-system/css/css';

const section = css({
  fontFamily: 'Roboto',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position='top-center'
      reverseOrder={false}
      toastOptions={{
        duration: 5000
      }}
    />
    <section className={section}>
      <header>
        <Navbar />
      </header>
      <App />
    </section>
  </React.StrictMode>,
)
