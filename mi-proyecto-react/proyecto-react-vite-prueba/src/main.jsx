import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Contenedor from './Contenedor.jsx'
import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contenedor />
  </StrictMode>
)
