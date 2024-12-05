import React from "react"
import { useState, useEffect } from 'react';
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
	const [lista, setLista] = useState([]);
	useEffect(()=>{
		fetch('http://100.25.250.69/ninos')
		.then((response) => response.json())
		.then((data) => {
			setLista(data)
			console.log(data)
		})
	}, [])
	
	var lineas=[];
	for(var i of lista){
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
			<tr>
				<td><input type="text"/></td>
				<td><input type="text"/></td>
				<td><input type="text"/></td>
				<td><input type="text"/></td>
				<td><input type="buttom" value="guardar"/></td>
			</tr>
			{lista.map((niño) => (
				<tr key={niño.id}>
					<td>{niño.id}</td>

					<td>{niño.nombre} {niño.apellido_mat} {niño.apellido_pat}</td>

					<td>{niño.id_tutor}</td>
		        	<td>{niño.telefono}</td>
        			<td><a href="google.com">perfil</a></td>
        		</tr>
			))}
		</table>
	)
}
