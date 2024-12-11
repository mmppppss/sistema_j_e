import React from "react"
import { useState, useEffect } from 'react';
import CrearVoluntario from "./CrearVoluntario";
import ActualizarVoluntarioact from "./ActualizarVoluntario";
import '../actividad/Actividad.css'

function elemento(voluntarioact, setVoluntarioact){
	return(
		<tr>
			<td>{voluntarioact.id}</td>
			<td>{voluntarioact.nombre}</td>
			<td>{voluntarioact.descripcion}</td>
			<td>{voluntarioact.fecha}</td>
			<td>{voluntarioact.hora}</td>
			<td><input type="button" onClick={()=>{
				window.location.href=`/actualizarvoluntarioact/${voluntarioact.id}`
			}}	
			value="Editar"/></td>
			<td>
        	<input 
        	type="button" 
          	value="Eliminar"
         	onClick={() => borrarVoluntarioact(voluntarioact.id, setVoluntarioact)}
        />
      </td>
		</tr>
	)
}
function borrarVoluntarioact(id, setVoluntarioact) {
	const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar las actividades a realizar de voluntario?");
	
	if (confirmacion) {
	  // Filtrar las voluntarioactes para eliminar la voluntarioact con ese ID
	  setVoluntarioact(prevVoluntarioactes => prevVoluntarioactes.filter(voluntarioact => voluntarioact.id !== id));
	  console.log(`Voluntarioact con ID ${id} eliminada`);
	}
  }
  
export default function Voluntarioact(){
	const [voluntarioact, setVoluntarioact] = useState([]);
	useEffect(()=>{
		setVoluntarioact([{id: 1, nombre:"Jardineria", descripcion:"Plantar plantas", fecha:"12-03-2024", hora:"08:00 am"},{id:2, nombre:"panaderia", descripcion:"hacer pan frances", fecha:"05-12-2024", hora:"15:00"}])
	}, [])
	
	var lineas=[];
	for(var i of voluntarioact){
		lineas.push(elemento(i, setVoluntarioact))
	}
	return(
		<table>
			<tr className="titulos">
				<th>id </th>
				<th>Nombre </th>
				<th>descripcion</th>
				<th>Fecha</th>
				<th>Hora</th>
				<th><input type="button" onClick={()=>{window.location.href=`/crearvoluntarioact`}} value="Crear Voluntarioact"/></th>
			</tr>
            {lineas}
		</table>
	)
}
