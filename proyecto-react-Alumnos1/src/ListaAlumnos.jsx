  import './App.css';
  import { Link } from 'react-router-dom';
  import { alumnos } from './Alumnos.js'

  const ListaAlumnos = ({ alumnos, onEdit, onDelete }) => {
    return (

      <div>
        <h3>Lista de todos los Alumnos:</h3>
        <ul>
          {alumnos.map((alumno, index) => (
            <li key={index}>
              {alumno.nombre} - Grupo {alumno.grupo} - Id: {alumno.id}
              <Link className='link-editar' to={`/editar/${alumno.id}`} onClick={() => onEdit(alumno.id)} >Editar</Link> 
              <button className="boton-borrar" onClick={() => onDelete(alumno.id)}>Borrar</button> 
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default ListaAlumnos;



