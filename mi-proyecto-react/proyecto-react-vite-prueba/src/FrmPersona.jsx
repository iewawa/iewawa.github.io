// import { useState } from 'react'
// import './App.css'

// function FrmPersona({addPersona}) {
//   let setNombre, setEsMayorDeEdad, setCiclo;
//   //Datos inicales que queremos qeu aparezcan en el formulario
//   const unaPersona = { 
//     nombre: "", 
//     esMayorEdad: true,
//     ciclo:  "superior"
//   };

//   [unaPersona.nombre, setNombre] = useState(unaPersona.nombre);
//   [unaPersona.esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad);
//   [unaPersona.ciclo, setCiclo] = useState(unaPersona.ciclo); 
//   //console.log(unaPersona);

//   return (
//     <>
//     <h2>Formulario con React</h2>
//      <h3>Formulario clase actualiazdo</h3>
//       <form action="" onSubmit={(e) =>{e.preventDefault(); 
//                                 addPersona(unaPersona);}}> 
//         <div>
//           <label htmlFor="nombre">Nombre completo:</label>
//           <input 
//             type="text" 
//             name="nombre" 
//             id="nombre" 
//             value={unaPersona.nombre} 
//             onChange={(e) => setNombre(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="mayor-edad">Es mayor de edad:</label>
//           <input 
//             type="checkbox" 
//             name="mayorEdad" 
//             id="mayor-edad"  
//             checked={unaPersona.esMayorDeEdad} 
//             onChange={(e) => setEsMayorDeEdad(e.target.checked)}
//           />
//         </div>
//         <div>
//           <label>Ciclo:</label>
//           <div>
//             <input 
//               type="radio" 
//               name="ciclo" 
//               id="ciclo-medio" 
//               value="medio" 
//               checked={unaPersona.ciclo === 'medio'} 
//               onChange={(e) => setCiclo(e.target.value)}
//             />
//             <label htmlFor="ciclo-medio">Medio</label>
//           </div>
//           <div>
//             <input 
//               type="radio" 
//               name="ciclo" 
//               id="ciclo-superior" 
//               value="superior" 
//               checked={unaPersona.ciclo === 'superior'} 
//               onChange={(e) => setCiclo(e.target.value)}
//             />
//             <label htmlFor="ciclo-superior">Superior</label>
//           </div>
//         </div>
//         <button type="submit" value="Añadir persona">Enviar</button>
//       </form>
//     </>
//   )
// }

// export default FrmPersona