import React from "react"
import { useState, useEffect } from 'react';

function elemento(analisismedico, setAnalisisMedico){
	return(
		<tr>
			<td>{analisismedico.id}</td>
			<td>{analisismedico.ci}</td>
			<td>{analisismedico.nombre}</td>
			<td>{analisismedico.apellido_pat}</td>
			<td>{analisismedico.apellido_mat}</td>
			<td>{analisismedico.sexo}</td>
			<td>{analisismedico.fechaNacimiento}</td>
			<td><input type="button" onClick={()=>{
				window.location.href=`/actualizaranalisismedico/${analisismedico.id}`
			}}	
			value="Historial Medico"/></td>
			<td>
        	<input 
        	type="button" 
          	value="Eliminar"
         	onClick={() => borrarAnalisisMedico(analisismedico.id, setAnalisisMedico)}
        />
      </td>
		</tr>
	)
}
function borrarAnalisisMedico(id, setAnalisisMedico) {
	const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este analisis medico?");
	
	if (confirmacion) {
	  // Filtrar las analisismedicoes para eliminar la analisismedico con ese ID
	  setAnalisisMedico(prevAnalisisMedico => prevAnalisisMedico.filter(analisismedico => analisismedico.id !== id));
	  console.log(`AnalisisMedico con ID ${id} eliminada`);
	}
  }
  
export default function AnalisisMedico(){
	const [analisismedico, setAnalisisMedico] = useState([]);
	useEffect(()=>{
		setAnalisisMedico([{id: 1, ci:999, nombre:"Monserra", apellido_pat:"Martinez",apellido_mat:"Vargas", sexo:"Femenino", fechaNacimiento:"01-10-2009"},{id:2, nombre:"Miguel", apellido_pat:"Arana", apellido_mat:"Luna",sexo:"Masculino",fechaNacimiento:"19-03-2015"}])
	}, [])
	
	var lineas=[];
	for(var i of analisismedico){
		lineas.push(elemento(i, setAnalisisMedico))	
	}
	return(
		<table>
			<tr className="titulos">
				<th>id </th>
				<th>ci</th>
				<th>nombre</th>
				<th>apellido_pat</th>
				<th>apellido_mat</th>
				<th>sexo</th>
				<th>fechaNacimiento</th>
				<th></th>
				<th><input type="button" onClick={()=>{window.location.href=`/crearactividad`}} value="Crear Actividad"/></th>
			</tr>
            {lineas}
		</table>
	)
}
