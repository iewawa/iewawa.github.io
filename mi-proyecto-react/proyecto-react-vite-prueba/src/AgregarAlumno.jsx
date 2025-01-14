import FormularioAlumno from './FormularioAlumno.jsx';
import { useState } from 'react';
import ListaAlumnos from './ListaAlumnos.jsx';
import { alumnos } from './Alumnos.js'
import './App.css';

const AgregarAlumno = () => {
    const [numAlumnos, setNumAlumnos] = useState(alumnos.length);

    const addAlumno = (alumno) => {
        alumnos.push(alumno);
        setNumAlumnos(alumnos.length);
    };

    const handleUpdate = (id, updatedAlumno) => {
      const index = alumnos.findIndex(alumno => alumno.id == id);
      if (index !== -1) {
        alumnos[index] = { ...alumnos[index], nombre: updatedAlumno.nombre, grupo: updatedAlumno.grupo };
        setNumAlumnos(alumnos.length);
      }
    };

    const handleDelete = (id) => {
        const index = alumnos.findIndex(alumno => alumno.id == id);
        if (index !== -1) {
            alumnos.splice(index, 1);
            setNumAlumnos(alumnos.length);
        }
    };

    return (
        <>
            <FormularioAlumno addAlumno={addAlumno} />
            <ListaAlumnos alumnos={alumnos} onEdit={handleUpdate} onDelete={handleDelete} />
        </>
    );
};

export default AgregarAlumno;
