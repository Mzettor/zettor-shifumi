import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Navbar from './components/Navbar.tsx'
import { css } from '../styled-system/css/css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <section className={css({
      fontFamily: 'Roboto'
    })}>
      <header>
        <Navbar />
      </header>
      <App />
    </section>
  </React.StrictMode>,
)
