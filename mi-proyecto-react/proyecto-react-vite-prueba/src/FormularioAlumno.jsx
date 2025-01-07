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
    } else if (nombre.length < 4 || nombre.length > 20) {
      nuevosErrores.nombre =
        "El nombre debe tener entre 4 y 20 caracteres.";
    }
    if (!grupo) {
      nuevosErrores.grupo = "Debes seleccionar un grupo.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;  // Retorna true si no hay errores
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const unAlumno = { id, nombre, grupo };
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
            // required // Dejo comentado el required para que se aplique la validacion que he hecho yo por js y salgan mis mensajes
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

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

FormularioAlumno.propTypes = {
  addAlumno: PropTypes.func.isRequired
};

export default FormularioAlumno;
