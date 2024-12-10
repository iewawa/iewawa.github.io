import { useState } from 'react'
import './App.css'

const unaPersona = { 
  nombre: '', 
  esMayorEdad: false
};

function App() {
  const [nombre, setNombre] = useState(unaPersona.nombre)
  const [esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad)

  return (
    <>
      <form action=""> 
        <div>
          <label htmlFor="name">Nombre completo:</label>
          <input 
            type="text" 
            name="nombre" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => {
              setNombre(e.target.value);
              console.log(nombre);
            }}
          />
        </div>
        <div>
          <label htmlFor="age">Es mayor de edad:</label>
          <input 
            type="checkbox" 
            name="mayorEdad" 
            id="mayor-edad"  
            checked={esMayorDeEdad} 
            onChange={(e) => {
              setEsMayorDeEdad(e.target.checked);
              console.log(esMayorDeEdad);
            }}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default App
