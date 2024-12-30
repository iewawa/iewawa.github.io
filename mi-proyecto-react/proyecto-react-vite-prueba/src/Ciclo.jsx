import './App.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Ciclo() {
  const navegar = useNavigate();
  return (
    <>
      <h1>Mi ciclo es DAW - Desarrollo de Aplicaciones Web</h1>
      <Link to="/Centro"> Ir a datos del centro educativo</Link>
      <button onClick={(e)=>{navegar("/Curso", {replace:true})}}>Nuevo Curso</button>
    </>
  )
}