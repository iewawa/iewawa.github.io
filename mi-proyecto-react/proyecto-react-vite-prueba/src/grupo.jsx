import React from 'react'
import { useParams } from 'react-router-dom'
import './App.css'

const alumnos = [
  {grupo:"A",nombre:"Juan"},
  {grupo:"A",nombre:"Eva"},
  {grupo:"B",nombre:"Ana"},
  {grupo:"B",nombre:"Julia"},
  {grupo:"B",nombre:"Antonio"}
]


export default function grupo() {
  const parametros = useParams()

  return (
    <>
      <h2>Alumnos del curso 2º DAW {parametros.letra}</h2>
      <ul>
        {alumnos
          .filter((alumno) => alumno.grupo === parametros.letra)
          .map((alumno, index) => (
            <li key={index}>{alumno.nombre}</li>
          ))}
      </ul>
    </>
  )
}
