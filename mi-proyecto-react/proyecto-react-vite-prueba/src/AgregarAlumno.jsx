import FormularioAlumno from './FormularioAlumno.jsx';
import { useState } from 'react';
import ListaAlumnos, { alumnos } from './ListaAlumnos.jsx';
import './App.css';

const AgregarAlumno = () => {
    const [numAlumnos, setNumAlumnos] = useState(alumnos.length);

    const addAlumno = (alumno) => {
        alumnos.push(alumno);
        setNumAlumnos(alumnos.length);
    };

    ///////////////////// Esto seria para actualizar un alumno pero faltaría cambiarlo, donde le meto los datos
    const handleUpdate = (id, updatedAlumno) => {
      const index = alumnos.findIndex(alumno => alumno.id == id);
      if (index !== -1) {
        alumnos[index] = { ...alumnos[index], ...updatedAlumno };
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
