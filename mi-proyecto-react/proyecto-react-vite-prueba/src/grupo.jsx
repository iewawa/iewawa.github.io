import { useParams } from 'react-router-dom'
import './App.css'
import { alumnos } from './ListaAlumnos.jsx'


export default function Grupo() {
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
