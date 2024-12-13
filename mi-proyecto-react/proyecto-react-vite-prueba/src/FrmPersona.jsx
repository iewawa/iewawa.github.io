import { useState } from 'react'
import './App.css'

function FrmPersona({addPersona}) {
  let setNombre, setEsMayorDeEdad, setCiclo;
    //Datos inicales que queremos qeu aparezcan en el formulario
  const unaPersona = { 
    nombre: "", 
    esMayorEdad: true,
    ciclo:  "superior"
  };

  [unaPersona.nombre, setNombre] = useState(unaPersona.nombre);
  [unaPersona.esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad);
  [unaPersona.ciclo, setCiclo] = useState(unaPersona.ciclo); 

  return (
    <>
    <h2>Formulario con React</h2>
     <h3>Formulario clase actualiazdo</h3>
      <form action="" onSubmit={(e) =>{e.preventDefault(); 
                                addPersona(unaPersona);}}> 
        <div>
          <label htmlFor="nombre">Nombre completo:</label>
          <input 
            type="text" 
            name="nombre" 
            id="nombre" 
            value={unaPersona.nombre} 
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mayor-edad">Es mayor de edad:</label>
          <input 
            type="checkbox" 
            name="mayorEdad" 
            id="mayor-edad"  
            checked={unaPersona.esMayorDeEdad} 
            onChange={(e) => setEsMayorDeEdad(e.target.checked)}
          />
        </div>
        <div>
          <label>Ciclo:</label>
          <div>
            <input 
              type="radio" 
              name="ciclo" 
              id="ciclo-medio" 
              value="medio" 
              checked={unaPersona.ciclo === 'medio'} 
              onChange={(e) => setCiclo(e.target.value)}
            />
            <label htmlFor="ciclo-medio">Medio</label>
          </div>
          <div>
            <input 
              type="radio" 
              name="ciclo" 
              id="ciclo-superior" 
              value="superior" 
              checked={unaPersona.ciclo === 'superior'} 
              onChange={(e) => setCiclo(e.target.value)}
            />
            <label htmlFor="ciclo-superior">Superior</label>
          </div>
        </div>
        <button type="submit" value="Añadir persona">Enviar</button>
      </form>
    </>
  )
}

export default FrmPersona

//--------------------Version anterior----------------

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

//--------------------Otra version anterior----------------

// import { useState} from 'react'
// // import { useState, useEffect } from 'react'
// import './App.css'

// const unaPersona = { 
//   nombre: "Juan", 
//   esMayorEdad: true,
//   ciclo:  "medio"
// };

// function App() {
//   let setNombre, setEsMayorDeEdad, setCiclo;

//   [unaPersona.nombre, setNombre] = useState(unaPersona.nombre);
//   [unaPersona.esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad);
//   [unaPersona.ciclo, setCiclo] = useState(unaPersona.ciclo); //nuevo

//   console.log(unaPersona);

//   // ----------Mi formulario----------------
//   // useEffect(() => {
//   //   unaPersona.nombre = nombre;
//   //   unaPersona.esMayorEdad = esMayorDeEdad;
//   //   unaPersona.ciclo = ciclo; //nuevo
//   //   console.log(unaPersona);
//   // }, [nombre, esMayorDeEdad, ciclo]);

//   // //nuevo: en el submit del form hago el manejarenvio
//   // const manejarEnvio = (e) => {
//   //   e.preventDefault();
//   //   console.log('Personae enviada:', unaPersona);
//   // };

//     // ----------Formulario clase actualiazdo----------------
//   // Modificando lo useState
//   return (
//     <>
//     <h2>Formulario con React</h2>
//      <h3>Formulario clase actualiazdo</h3>
//       <form action=""> 
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
//         <button type="submit">Enviar</button>
//       </form>

//       {/* <h3>Mi Formulario</h3>
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
//       </form> */}
//     </>
//   )
// }

// export default App

//--------------------Version anterior----------------

// // import { useState } from 'react'
// // import './App.css'

// // const unaPersona = { 
// //   nombre: '', 
// //   esMayorEdad: false
// // };

// // function App() {
// //   const [nombre, setNombre] = useState(unaPersona.nombre)
// //   const [esMayorDeEdad, setEsMayorDeEdad] = useState(unaPersona.esMayorEdad)
// //   const [ciclo, setCiclo] = useState(unaPersona.ciclo)

// //   return (
// //     <>
// //       <form action=""> 
// //         <div>
// //           <label htmlFor="name">Nombre completo:</label>
// //           <input 
// //             type="text" 
// //             name="nombre" 
// //             id="nombre" 
// //             value={nombre} 
// //             onChange={(e) => {
// //               setNombre(e.target.value);
// //               console.log(nombre);
// //             }}
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="age">Es mayor de edad:</label>
// //           <input 
// //             type="checkbox" 
// //             name="mayorEdad" 
// //             id="mayor-edad"  
// //             checked={esMayorDeEdad} 
// //             onChange={(e) => {
// //               setEsMayorDeEdad(e.target.checked);
// //               console.log(esMayorDeEdad);
// //             }}
// //           />
// //         </div>

// //         <div>
// //           <label>Ciclo:</label>
// //           <div>
// //             <input 
// //               type="radio" 
// //               name="ciclo" 
// //               id="ciclo-medio" 
// //               value="medio" 
// //               checked={ciclo === 'medio'} 
// //               onChange={(e) => {
// //                 setCiclo(e.target.value);
// //                 unaPersona.ciclo = e.target.value;
// //                 console.log(ciclo);
// //               }}
// //             />
// //             <label htmlFor="ciclo-medio">Medio</label>
// //           </div>
// //           <div>
// //             <input 
// //               type="radio" 
// //               name="ciclo" 
// //               id="ciclo-superior" 
// //               value="superior" 
// //               checked={ciclo === 'superior'} 
// //               onChange={(e) => {
// //                 setCiclo(e.target.value);
// //                 unaPersona.ciclo = e.target.value;
// //                 console.log(ciclo);
// //               }}
// //             />
// //             <label htmlFor="ciclo-superior">Superior</label>
// //           </div>
// //         </div>
// //         <button type="submit">Enviar</button>
// //       </form>
// //     </>
// //   )
// // }
// // //hacer que haya un return de persona y un console log de la con las cosas seleccionadas/indicada persona


// // export default App

