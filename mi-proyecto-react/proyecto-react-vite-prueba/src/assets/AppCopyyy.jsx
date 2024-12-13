// import { useState, useEffect } from 'react'
// import './App.css'

// const unaPersona = { 
//   nombre: '', 
//   esMayorEdad: false,
//   ciclo: ''
// };

// function App() {
//   const [nombre, setNombre] = useState(unaPersona.nombre)
//   const [esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad)
//   const [ciclo, setCiclo] = useState(unaPersona.ciclo)

//   useEffect(() => {
//     unaPersona.nombre = nombre;
//     unaPersona.esMayorEdad = esMayorDeEdad;
//     unaPersona.ciclo = ciclo;
//     console.log(unaPersona);
//   }, [nombre, esMayorDeEdad, ciclo]);

//   const manejarEnvio = (e) => {
//     e.preventDefault();
//     console.log('Persona:', unaPersona);
//   };

//   return (
//     <>
//       <form onSubmit={manejarEnvio}> 
//         <div>
//           <label htmlFor="nombre">Nombre completo:</label>
//           <input 
//             type="text" 
//             name="nombre" 
//             id="nombre" 
//             value={nombre} 
//             onChange={(e) => setNombre(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="mayor-edad">Es mayor de edad:</label>
//           <input 
//             type="checkbox" 
//             name="mayorEdad" 
//             id="mayor-edad"  
//             checked={esMayorDeEdad} 
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
//               checked={ciclo === 'medio'} 
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
//               checked={ciclo === 'superior'} 
//               onChange={(e) => setCiclo(e.target.value)}
//             />
//             <label htmlFor="ciclo-superior">Superior</label>
//           </div>
//         </div>
//         <button type="submit">Enviar</button>
//       </form>
//     </>
//   )
// }

// export default App



//-------------------------------------------------------------------------------




// import { useState } from 'react'
// import './App.css'

// const unaPersona = { 
//   nombre: '', 
//   esMayorEdad: false
// };

// function App() {
//   const [nombre, setNombre] = useState(unaPersona.nombre)
//   const [esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad)
//   const [ciclo, setCiclo] = useState(unaPersona.ciclo)

//   return (
//     <>
//       <form action=""> 
//         <div>
//           <label htmlFor="name">Nombre completo:</label>
//           <input 
//             type="text" 
//             name="nombre" 
//             id="nombre" 
//             value={nombre} 
//             onChange={(e) => {
//               setNombre(e.target.value);
//               console.log(nombre);
//             }}
//           />
//         </div>
//         <div>
//           <label htmlFor="age">Es mayor de edad:</label>
//           <input 
//             type="checkbox" 
//             name="mayorEdad" 
//             id="mayor-edad"  
//             checked={esMayorDeEdad} 
//             onChange={(e) => {
//               setEsMayorDeEdad(e.target.checked);
//               console.log(esMayorDeEdad);
//             }}
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
//               checked={ciclo === 'medio'} 
//               onChange={(e) => {
//                 setCiclo(e.target.value);
//                 unaPersona.ciclo = e.target.value;
//                 console.log(ciclo);
//               }}
//             />
//             <label htmlFor="ciclo-medio">Medio</label>
//           </div>
//           <div>
//             <input 
//               type="radio" 
//               name="ciclo" 
//               id="ciclo-superior" 
//               value="superior" 
//               checked={ciclo === 'superior'} 
//               onChange={(e) => {
//                 setCiclo(e.target.value);
//                 unaPersona.ciclo = e.target.value;
//                 console.log(ciclo);
//               }}
//             />
//             <label htmlFor="ciclo-superior">Superior</label>
//           </div>
//         </div>
//         <button type="submit">Enviar</button>
//       </form>
//     </>
//   )
// }
// //hacer que haya un return de persona y un console log de la con las cosas seleccionadas/indicada persona


// export default App

