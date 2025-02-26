import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function Layoutlet() {
  return (
    <main>
      <nav>
        <Link to="/">Inicio</Link>  |
        <Link to="/Centro">Centro</Link>  |
        <Link to="/GestionarAlumnos">Gestionar Alumnos</Link>  |
        <Link to="/AgregarAlumno">Agregar Alumnos</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
