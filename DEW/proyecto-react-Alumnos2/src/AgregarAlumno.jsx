import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { AlumnosContext } from "./AlumnosContext";
import "./App.css";

const AgregarAlumno = () => {
  const { alumnos, agregarAlumno } = useContext(AlumnosContext);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("A"); // Establece el valor inicial del grupo
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const navigate = useNavigate(); // Instancia useNavigate

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (id.trim() && nombre.trim() && grupo.trim()) {
      if (alumnos.some(alumno => alumno.id == id)) {
        setError("El ID ya existe. Por favor, introduce un ID diferente.");
        return;
      } else if (!/^\d+$/.test(id)) {
        setError("El ID debe ser un número.");
        return;
      } else if (nombre.length < 4 || nombre.length > 20) {
        setError("El nombre debe tener entre 4 y 20 caracteres.");
        return;
      } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        setError("El nombre solo debe contener letras.");
        return;
      }

      agregarAlumno({ id, nombre, grupo });
      setId("");
      setNombre("");
      setGrupo("A"); // Restablece el valor del grupo a "A"
      setError(""); // Limpia el mensaje de error
      navigate("/GestionarAlumnos"); // Redirige a la lista de alumnos
    } else {
      setError("Por favor, completa todos los campos.");
    }
  };


  return (
    <div>
      <h1>Agregar Alumno</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Grupo:
          <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
            <option value="" disabled>Seleccione un grupo</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </label>
        <button type="submit">Agregar</button>
      </form>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default AgregarAlumno;
