// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Contenedor from './Contenedor.jsx'
import './index.css'
import './App.css'

import Curso from './Curso.jsx'
import Ciclo from './Ciclo.jsx'
import Inicio from './Inicio.jsx'
import Centro from './Centro.jsx'
import Daw2 from './Daw2.jsx'
import Grupo from './Grupo.jsx'
import Editar from './Editar.jsx'
import AgregarAlumno from './AgregarAlumno.jsx'

import Layoutlet from './layoutlet.jsx'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layoutlet />}>
        <Route index element={<Inicio />} />
        <Route path="/Centro" element={<Centro />} />
        <Route path="/Daw2" element={<Daw2 />} />
        <Route path="/grupo/:letra" element={<Grupo/>}/>
        <Route path="/editar/:id" element={<Editar/>}/>
        <Route path="/AgregarAlumno" element={<AgregarAlumno />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
      <Route path="/Ciclo" element={<Ciclo />} />
      <Route path="/Curso" element={<Curso />} />
    </Routes>
  </BrowserRouter>
)
