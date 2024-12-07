import React from "react"
import { useState, useEffect } from 'react';
import CrearActividad from "./CrearActividad";
import ActualizarActividad from "./ActualizarActividad";
import './Actividad.css'
function elemento(actividad, setActividad){
	return(
		<tr>
			<td>{actividad.nombre}</td>
			<td>{actividad.descripcion}</td>
			<td>{actividad.fecha}</td>
			<td>{actividad.hora}</td>
			<td><input type="button" onClick={()=>{
				window.location.href=`/actualizaractividad/${actividad.id}`
			}}	
			value="Editar"/></td>
			<td>
        	<input 
        	type="button" 
          	value="Eliminar"
         	onClick={() => borrarActividad(actividad.id, setActividad)}
        />
      </td>
		</tr>
	)
}
function borrarActividad(id, setActividad) {
	const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta actividad?");
	
	if (confirmacion) {
	  // Filtrar las actividades para eliminar la actividad con ese ID
	  setActividad(prevActividades => prevActividades.filter(actividad => actividad.id !== id));
	  console.log(`Actividad con ID ${id} eliminada`);
	}
  }
  
export default function Actividad(){
	const [actividad, setActividad] = useState([]);
	useEffect(()=>{
		setActividad([{id: 1, nombre:"hjhgjj", descripcion:"kjkjk", fecha:"das", hora:"jja"},{id:2, nombre:"jardineria", descripcion:"riegue de plantas", fecha:"19_02", hora:"jja"}])
	}, [])
	
	var lineas=[];
	for(var i of actividad){
		lineas.push(elemento(i, setActividad))
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
