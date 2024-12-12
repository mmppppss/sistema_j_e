import React from "react"
import { useState, useEffect } from 'react';

function elemento(analisismedico, setAnalisisMedico){
	return(
		<tr>
			<td>{analisismedico.ci}</td>
			<td>{analisismedico.nombre} {analisismedico.apellido_pat} {analisismedico.apellido_mat}</td>
			<td>{analisismedico.sexo}</td>
			<td>{analisismedico.fecha_nacimiento}</td>
			<td><input type="button" onClick={()=>{
				window.location.href=`/historialmedico/${analisismedico.id}`
			}}	
			value="Historial Medico"/></td>
			<td>
        	<input 
        	type="button" 
          	value="Nuevo analisis"
         	onClick={() => window.location.href=`/nuevoanalisis/${analisismedico.id}`}
        />
      </td>
		</tr>
	)
}
  
export default function AnalisisMedico(){
	const [analisismedico, setAnalisisMedico] = useState([]);

	useEffect(()=>{
		fetch('http://100.25.250.69/ninos')
			.then((response) => response.json())
			.then((data) => {
				setAnalisisMedico(data)
			})
	}, [])
	
	var lineas=[];
	for(var i of analisismedico){
		lineas.push(elemento(i, setAnalisisMedico))	
	}
	return(
		<table>
			<tr className="titulos">
				<th>Ci</th>
				<th>Paciente</th>
				<th>Sexo</th>
				<th>Fecha de nacimiento</th>
				<th></th>
				<th></th>
			</tr>
            {lineas}
		</table>
	)
}
