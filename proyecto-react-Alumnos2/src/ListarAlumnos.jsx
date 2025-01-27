import React, { useContext } from "react";
import { AlumnosContext } from "./AlumnosContext";
import { Link } from "react-router-dom";
import "./App.css";
const ListarAlumnos = () => {
  const { alumnos, eliminarAlumno } = useContext(AlumnosContext);

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      {alumnos.length === 0 ? (
        <p>No hay alumnos disponibles.</p>
      ) : (
        <ul>
          {alumnos.map((alumno) => (
            <li key={alumno.id}>
              ID: {alumno.id} - Nombre: {alumno.nombre} - Grupo: {alumno.grupo}
              <div>
              <button className="boton-editar"><Link to={`/EditarAlumno/${alumno.id}`}> Editar</Link></button>
              {/* <Link to={`/EditarAlumno/${alumno.id}`}> Editar</Link> */}
              <button className="boton-eliminar" onClick={() => eliminarAlumno(alumno.id)}> Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarAlumnos;
