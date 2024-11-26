import React from "react";

function elemento(niño){
    
	return(
		<tr>
			<td>{niño.id}</td>
			<td>{niño.nombre}</td>
			<td> <input type="checkbox" checked={niño.asistencia}></input>  </td>
		</tr>
	)
}

export default function Asistencia(){
    var lista=[{id:1, nombre:"hola", asistencia:false}, {id:2, nombre:"mundo", asistencia:false}];
    var lineas=[]
	for(var i of lista){
		lineas.push(elemento(i))
	}
    return(
        <table>
        <tr className="titulos">
            <th>ID</th>
            <th>Nombre </th>
            <th>Asistencia</th>
        </tr>
        {lineas}
    </table>
    )
}