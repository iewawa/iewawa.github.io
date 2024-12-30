import './App.css'

export const alumnos = [
  {id: 1, grupo:"A", nombre: "Juan"},
  {id: 2, grupo:"A", nombre: "Eva"},
  {id: 3, grupo:"B", nombre: "Ana"},
  {id: 4, grupo:"B", nombre: "Julia"},
  {id: 5, grupo:"B", nombre:"Antonio"}
];

const ListaAlumnos = ({ alumnos }) => {
  return (
  <div>
    <h3>Lista de todos los Alumnos</h3>
    <ul>
    {alumnos.map((alumno, index) => (
      <li key={index}>
      {alumno.nombre} - Grupo {alumno.grupo} - Id: {alumno.id}
      </li>
    ))}
    </ul>
  </div>
  );
};

export default ListaAlumnos;
