import React, { createContext, useState } from "react";
import "./App.css";
export const AlumnosContext = createContext();

export const AlumnosProvider = ({ children }) => {
  const [alumnos, setAlumnos] = useState([
    { id: 1, grupo: "A", nombre: "Juan" },
    { id: 2, grupo: "A", nombre: "Eva" },
    { id: 3, grupo: "B", nombre: "Ana" },
    { id: 4, grupo: "B", nombre: "Julia" },
    { id: 5, grupo: "B", nombre: "Antonio" },
  ]);

  const agregarAlumno = (nuevoAlumno) => {
    setAlumnos((prevAlumnos) => [...prevAlumnos, nuevoAlumno]);
  };

  const editarAlumno = (id, datosActualizados) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, ...datosActualizados } : alumno
      )
    );
  };

  const eliminarAlumno = (id) => {
    const alumno = alumnos.find((alumno) => alumno.id === id);
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar este alumno? - Alumno: ${alumno.nombre}`);
    if (confirmacion) {
      setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id !== id));
    }
  };

  return (
    <AlumnosContext.Provider
      value={{ alumnos, agregarAlumno, editarAlumno, eliminarAlumno }}
    >
      {children}
    </AlumnosContext.Provider>
  );
};
