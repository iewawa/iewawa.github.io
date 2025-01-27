// import React from 'react'
import FormularioAlumno from './FormularioAlumno.jsx';
import { useState } from 'react';
// import ListaAlumnos from './ListaAlumnos.jsx';
import { alumnos } from './Alumnos.js'
import './App.css';
import { useNavigate } from 'react-router-dom';

function AgregaAlumno() {
  const [numAlumnos, setNumAlumnos] = useState(alumnos.length);
  const navigate = useNavigate();

  const addAlumno = (alumno) => {
    alumnos.push(alumno);
    setNumAlumnos(alumnos.length);
    navigate('/GestionarAlumnos'); // Redirige a otra vista
  };

  return (
  <>
  <h2>Agrega Alumno</h2>
   <FormularioAlumno addAlumno={addAlumno} />
  </>
  )
}

export default AgregaAlumno