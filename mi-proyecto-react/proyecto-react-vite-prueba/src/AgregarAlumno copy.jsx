import FormularioAlumno from './FormularioAlumno.jsx';
import { useState } from 'react';
import ListaAlumnos,{ alumnos } from './ListaAlumnos.jsx'
import './App.css'

const AgregarAlumno = () => {
    const [numAlumnos, setNumAlumnos] = useState(alumnos.length);

    const addAlumno = (alumno) => {
        alumnos.push(alumno);
        setNumAlumnos(alumnos.length);
    };

    return (
        <>
            <FormularioAlumno addAlumno={addAlumno}/>
            <ListaAlumnos alumnos={alumnos}/>
        </>
    );
};

export default AgregarAlumno;
