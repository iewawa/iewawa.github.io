import { useState } from 'react'
import PropTypes from 'prop-types';
import './App.css'

function FormularioAlumno({ addAlumno }) {
  // Datos iniciales que queremos que aparezcan en el formulario
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("A");

  const handleSubmit = (e) => {
    e.preventDefault();
    const unAlumno = { nombre, grupo };
    addAlumno(unAlumno);
  };

  return (
    <>
      <h2>Formulario de agregar Alumno con React</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="grupo">Grupo:</label>
          <select
            name="grupo"
            id="grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
FormularioAlumno.propTypes = {
  addAlumno: PropTypes.func.isRequired,
};

export default FormularioAlumno;