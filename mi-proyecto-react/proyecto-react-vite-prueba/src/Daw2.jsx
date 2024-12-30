import './App.css'
import { Link } from 'react-router-dom'

export default function Daw2() {
  const grupos = ["A", "B"]

  return (
    <>
    <h1>Grupos de 2ºDAW</h1>
   
    <ul>
      {grupos.map((grupo) => 
        <li key={grupo}>
          <Link to={`/grupo/${grupo}`}>2º DAW grupo {grupo}</Link> 
        </li>)}
    </ul>
    </>
  )
}
