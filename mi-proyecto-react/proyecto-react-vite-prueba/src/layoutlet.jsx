import { Link, Outlet } from 'react-router-dom'
import './App.css'

export default function Layoutlet() {
  return (
    <main>
        <nav>
            <Link to="/">Inicio | </Link>
            <Link to="/Centro">Centro | </Link>
            <Link to="/Daw2"> 2º DAW  | </Link>
            <Link to="/AgregarAlumno"> Agregar Alumno</Link>
        </nav>
        <div>
            <Outlet/>
        </div>
    </main>
  )
}
