import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { alumnos } from './ListaAlumnos.jsx'

function FormularioAlumno({ addAlumno }) {
  // Datos iniciales del formulario
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("A"); 
  // Estado para errores de validación
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!id) {
      nuevosErrores.id = "El ID es obligatorio.";
    } else if (!/^\d+$/.test(id)) {
      nuevosErrores.id = "El ID debe ser un número.";
    } else if (alumnos.some(alumno => alumno.id == id)) {
      nuevosErrores.id = "El ID ya existe.";
    }
    if (!nombre) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (nombre.length < 3 || nombre.length > 20) {
      nuevosErrores.nombre = "El nombre debe tener entre 3 y 20 caracteres.";
    } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      nuevosErrores.nombre = "El nombre solo debe contener letras.";
    }
    if (!grupo) {
      nuevosErrores.grupo = "Debes seleccionar un grupo.";
    }
    setErrores(nuevosErrores);
    // Retorna true si no hay errores
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const unAlumno = { id: parseInt(id, 10), grupo, nombre };
    addAlumno(unAlumno);

    setId("");
    setNombre("");
    setGrupo("A");
    setErrores({});
  };

  return (
    <>
      <h2>Formulario de agregar Alumno con React</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Id: </label>
          <input
            type="number"
            name="id"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            // required
          />
          {errores.id && <p className="error">{errores.id}</p>}
        </div>

        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            // required
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>

        <div>
          <label htmlFor="grupo">Grupo: </label>
          <select
            name="grupo"
            id="grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            // required
          >
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          {errores.grupo && <p className="error">{errores.grupo}</p>}
        </div>

        <button className="boton-enviar" type="submit">Enviar</button>
        {console.log(alumnos)}
      </form>
    </>
  );
}

FormularioAlumno.propTypes = {
  addAlumno: PropTypes.func.isRequired
};

export default FormularioAlumno;
