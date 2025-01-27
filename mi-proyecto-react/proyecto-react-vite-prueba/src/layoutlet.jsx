import { Link, Outlet } from 'react-router-dom'
import './App.css'

export default function Layoutlet() {
  return (
    <main>
        <nav>
            <Link to="/">Inicio | </Link>
            <Link to="/Centro">Centro | </Link>
            <Link to="/Daw2"> 2º DAW  | </Link>
            <button onClick={() => window.location.href='/GestionarAlumnos'}>Gentión de Alumnos </button>
            <button onClick={() => window.location.href='/AgregaAlumno'}>Agregar Alumno </button>
        </nav>
        <div>
            <Outlet/>
        </div>
    </main>
  )
}
