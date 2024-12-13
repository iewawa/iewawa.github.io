
export default function ListaPersonas({personas}) {

        return(
        <>
        <table>
                <thead>
                        <tr>
                                <th>Nombre</th>
                                <th>Mayoría de Edad</th>
                                <th>Ciclo</th>
                        </tr>
                </thead>
                <tbody>
                        {personas.map((persona, i) => (
                                <tr key={i}>
                                        <td>{persona.nombre}</td>
                                        <td>{persona.esMayorDeEdad ? "si" : "no"}</td>
                                        <td>{persona.ciclo}</td>
                                </tr>
                        ))}
                </tbody>
        </table>
        </>
        )
}

