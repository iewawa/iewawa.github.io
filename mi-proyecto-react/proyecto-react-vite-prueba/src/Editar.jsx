import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";
import { alumnos } from './Alumnos.js'


function Editar() {
  const { id } = useParams();
  const alumnoId = parseInt(id, 10);

  // Encuentra el alumno a editar
  const alumno = alumnos.find(alumno => alumno.id === alumnoId);

  // Inicializa los estados con los valores del alumno encontrado
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("A");
  const [errores, setErrores] = useState({});
  const [alumnoDato, setNumAlumnos] = useState(alumno.name || alumno.grupo);

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre);
      setGrupo(alumno.grupo);
    }
  }, [alumno]);

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nombre) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (nombre.length < 4 || nombre.length > 20) {
      nuevosErrores.nombre = "El nombre debe tener entre 4 y 20 caracteres.";
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

    // Actualiza los datos del alumno
    alumno.nombre = nombre;
    alumno.grupo = grupo;
    setNombre(nombre);
    setGrupo(grupo);
    setErrores({});


   console.log(alumnos);
   setNumAlumnos(alumno.name || alumno.grupo);
  };

  return (
    <>
      <h2>Editar alumno</h2>
      <p>ID del Alumno: {id}</p>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={alumno ? alumno.nombre : ""}
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

        <button className="boton-actualizar" type="submit">Actualizar</button>
      </form>
 
    <h3>Todos los alumnos:</h3>
    <ul>
    {alumnos.map((alumno, index) => (
      <li key={index}>
        {alumno.nombre} - Grupo {alumno.grupo} - Id: {alumno.id}
        <Link className='link-editar' to={`/editar/${alumno.id}`} >Editar</Link> 
      </li>
    ))}
    </ul>
</>
  );
}

export default Editar;
