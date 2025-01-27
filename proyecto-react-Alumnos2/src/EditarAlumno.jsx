import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlumnosContext } from "./AlumnosContext";
import "./App.css";
const EditarAlumno = () => {
  const { id } = useParams(); // Obtiene el id desde la URL
  const navigate = useNavigate(); // Permite redirigir al usuario
  const { alumnos, editarAlumno } = useContext(AlumnosContext);

  const alumno = alumnos.find((al) => al.id === Number(id)); // Busca el alumno correspondiente

  const [nombre, setNombre] = useState(alumno?.nombre || "");
  const [grupo, setGrupo] = useState(alumno?.grupo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && grupo.trim()) {
      editarAlumno(Number(id), { nombre, grupo });
      navigate("/GestionarAlumnos"); // Redirige a la lista
    }
  };

  return (
    <div>
      <h1>Editar Alumno</h1>
      <h3>ID del Alumno: {id}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Grupo:
          <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
            <option value="" disabled>Seleccione un grupo</option>
            <option value="A">A</option>
            <option value="B" >B</option>
          </select>
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarAlumno;
