import React from "react"
import"./listaNiño.css"

function elemento(niño){
	return(
		<tr>
			<td>{niño.id}</td>
			<td>{niño.nombre} {niño.apellido_mat} {niño.apellido_pat}</td>
			<td>{niño.id_tutor}</td>
			<td>{niño.telefono}</td>
			<td><a href="google.com">perfil</a></td>
		</tr>
	)
}
export default function Lista(){
	var niños=[{"id":2,"ci":123,"nombre":"juan","apellido_pat":"villa","apellido_mat":"sans","sexo":"m","id_tutor":123,"telefono":123123,"fecha_nacimiento":"2024-11-09"},{"id":3,"ci":1230,"nombre":"pepe","apellido_pat":"perez","apellido_mat":"chavez","sexo":"m","id_tutor":988,"telefono":1231212,"fecha_nacimiento":"2012-12-12"}]
	var lineas=[];
	for(var i of niños){
		lineas.push(elemento(i))
	}
	return(
		<table>
			<tr className="titulos">
				<th>ID</th>
				<th>Nombre </th>
				<th>Tutor</th>
				<th>Telefono</th>
				<th>Ver perfil</th>
			</tr>
			{lineas}
		</table>
	)
}
