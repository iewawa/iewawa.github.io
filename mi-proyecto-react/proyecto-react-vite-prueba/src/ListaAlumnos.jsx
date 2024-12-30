import './App.css'

export const alumnos = [
  {grupo:"A",nombre:"Juan"},
  {grupo:"A",nombre:"Eva"},
  {grupo:"B",nombre:"Ana"},
  {grupo:"B",nombre:"Julia"},
  {grupo:"B",nombre:"Antonio"}
];

const ListaAlumnos = ({ alumnos }) => {
  return (
  <div>
    <h3>Lista de Alumnos</h3>
    <ul>
    {alumnos.map((alumno, index) => (
      <li key={index}>
      {alumno.nombre} - Grupo {alumno.grupo}
      </li>
    ))}
    </ul>
  </div>
  );
};

export default ListaAlumnos;
