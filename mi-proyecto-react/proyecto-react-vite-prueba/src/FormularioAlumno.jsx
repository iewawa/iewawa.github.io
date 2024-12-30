import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { alumnos } from './ListaAlumnos.jsx'

function FormularioAlumno({ addAlumno }) {
  // Datos iniciales del formulario
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("A"); // Selecciona el primer grupo por defecto si existe

  // Estado para errores de validación
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar ID
    if (!id) {
      nuevosErrores.id = "El ID es obligatorio.";
    } else if (!/^\d+$/.test(id)) {
      nuevosErrores.id = "El ID debe ser un número.";
    } else if (alumnos.some(alumno => alumno.id == id)) {
      nuevosErrores.id = "El ID ya existe.";
    }

    // Validar Nombre
    if (!nombre) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (nombre.length < 4 || nombre.length > 20) {
      nuevosErrores.nombre =
        "El nombre debe tener entre 4 y 20 caracteres.";
    }

    // Validar Grupo
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

    const unAlumno = { id, nombre, grupo };
    addAlumno(unAlumno);

    setId("");
    setNombre("");
    setGrupo("A");
    setErrores({});
  };
// //////////////////
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "id") {
//       setId(value);
//     } else if (name === "nombre") {
//       setNombre(value);
//     } else if (name === "grupo") {
//       setGrupo(value);
//     }
//   };

// ////////////////////

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
            required
            // disabled={false} // Permitir modificar el ID hasta que se envíe el formulario
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
            required
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
            required
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
