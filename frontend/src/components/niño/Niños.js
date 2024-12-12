import React from "react"
import { useState, useEffect } from 'react';
import"../actividad/Actividad.css"

function elemento(niño, setLista){
	return(
		<tr>
			<td>{niño.nombre} {niño.apellido_pat} {niño.apellido_mat}</td>
			<td>{niño.id_tutor}</td>
			<td>{niño.telefono}</td>
			<td><input type="button" onClick={()=>{
			window.location.href=`/actualizarnino/${niño.id}`
				}}	
				value="Editar"/>
			</td>
			<td>
				<input 
					type="button" 
					value="Eliminar"
					onClick={() => borrarNiño(niño.id, setLista)}
				/>
			</td>
		</tr>
	)
}
async function borrarNiño(id, setLista) {
	const confirmacion = window.confirm("¿Estás seguro de confirmar el eliminado?");
	if (confirmacion) {
		try {
            const response = await fetch(`http://100.25.250.69/ninos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setLista(prevLista => prevLista.filter(niño => niño.id !== id));
                alert('Niño eliminado con éxito');
            } else {
                alert('No se pudo eliminar el niño');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
	}
  }


export default function Lista(){
	const [lista, setLista] = useState([]);

	

	useEffect(()=>{
		fetch('http://100.25.250.69/ninos')
			.then((response) => response.json())
			.then((data) => {
				setLista(data)
			})
	}, [])

	var lineas=[];
	for(var i of lista){
		lineas.push(elemento(i, setLista))
	}
	return(
		<table>
		<tr className="titulos">
		<th>Nombre </th>
		<th>Tutor</th>
		<th>Telefono</th>
		<th></th>
		<th><input type="button" onClick={()=>{window.location.href=`/crearnino`}} value="Agregar Niño Nuevo"/></th>
		</tr>
		{lista.map((niño) => (
			elemento(niño, setLista)
		))}
		</table>
	)
}
