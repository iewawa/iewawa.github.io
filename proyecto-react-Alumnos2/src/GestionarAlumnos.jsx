import React, { useContext } from "react";
import ListarAlumnos from "./ListarAlumnos.jsx";
import { AlumnosContext } from "./AlumnosContext";
import "./App.css";
const GestionarAlumnos = () => {
  const { alumnos, setAlumnos } = useContext(AlumnosContext);

  const handleUpdate = (id) => {
    const alumno = alumnos.find((a) => a.id === id);
    if (alumno) {
      const nuevoNombre = prompt(`Editar nombre de ${alumno.nombre}:`, alumno.nombre);
      const nuevoGrupo = prompt(`Editar grupo de ${alumno.grupo}:`, alumno.grupo);
      if (nuevoNombre && nuevoGrupo) {
        const updatedAlumnos = alumnos.map((a) =>
          a.id === id ? { ...a, nombre: nuevoNombre, grupo: nuevoGrupo } : a
        );
        setAlumnos(updatedAlumnos);
      }
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas borrar este alumno?");
    if (confirmDelete) {
      const updatedAlumnos = alumnos.filter((a) => a.id !== id);
      setAlumnos(updatedAlumnos);
    }
  };

  return (
    <div>
      <h1>Gestionar Alumnos</h1>
      <ListarAlumnos 
        onEdit={handleUpdate} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default GestionarAlumnos;
