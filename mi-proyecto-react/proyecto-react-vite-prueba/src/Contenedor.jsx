// import { useState } from "react";
// import FrmPersona from "./FrmPersona";
// import ListaPersonas from "./ListaPersonas"
// import './App.css'

// let personas = [];

// function Contenedor() {
//     const [numPersonas, setNumPersonas] = useState(0);
//     // Las variables de estado cada vez que cambian se vuelve a renderizar el componente,
//     //  es decir, se vuelve a ejecutar el return

//     function addPersona(persona){
//         console.log("addPersona");
//                 personas.push(persona);
//                 setNumPersonas(personas.length);
//         console.log(personas);
//     }

//     console.log("FrmPersona");

// return ( 
//         <>
//         <h2>Contenedor</h2>
//                 <ListaPersonas personas={personas}/>
//                 <FrmPersona addPersona={addPersona}/>
//         </>
//         );
// }
// export default Contenedor;
