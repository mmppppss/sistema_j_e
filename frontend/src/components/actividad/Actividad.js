import React from "react"
import { useState, useEffect } from 'react';
import CrearActividad from "./CrearActividad";
import ActualizarActividad from "./ActualizarActividad";
import './Actividad.css'
function elemento(actividad, setActividad, session){
	function x(){if(session.permission == 0){
		return (<><td><input type="button" onClick={()=>{
			window.location.href=`/actualizaractividad/${actividad.id}`
			}}	
			value="Editar"/></td>
			<td>
        	<input 
        	type="button" 
        	value="Eliminar"
        	onClick={() => borrarActividad(actividad.id, setActividad)}
        />
      </td></>)
	}}
	return(
		<tr>
			<td>{actividad.nombre}</td>
			<td>{actividad.descripcion}</td>
			<td>{actividad.fecha}</td>
			<td>{actividad.hora}</td>
			{x()}
		</tr>
	)
}
function borrarActividad(id, setActividad) {
	const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta actividad?");
	
	if (confirmacion) {
		// Filtrar las actividades para eliminar la actividad con ese ID
		try {
			fetch(`http://100.25.250.69/actividad/${id}`, {
				method: 'DELETE',
			}).then((response) => {
				if (response.ok) {
					setActividad((prevActividad) => prevActividad.filter((actividad) => actividad.id !== id));
					alert('Actividad eliminada con exito');
				} else {
					alert('Error al eliminar la actividad');
				}
			});
		} catch (error) {
			alert('Error al eliminar la actividad');
		}
	}
}
  
export default function Actividad(props){
	const [actividad, setActividad] = useState([]);
	useEffect(()=>{
		fetch('http://100.25.250.69/actividad')
			.then((response) => response.json())
			.then((data) => {
				setActividad(data)
				console.log(data)
			})
	}, [])
	
	var lineas=[];
	for(var i of actividad){
		lineas.push(elemento(i, setActividad, props.session))
	}
	return(
		<table>
			<tr className="titulos">
				<th>Nombre </th>
				<th>descripcion</th>
				<th>Fecha</th>
				<th>Hora</th>
				<th></th>
				<th><input type="button" onClick={()=>{window.location.href=`/crearactividad`}} value="Crear Actividad"/></th>
			</tr>
            {lineas}
		</table>
	)
}
