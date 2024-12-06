import React from "react";
import {useState, useEffect} from 'react';

export default function HistorialMedico(){
	const [historial, setHistorial] = useState([]);
	useEffect(()=>{
		fetch('http://100.25.250.69/historial')
		.then((response) => response.json())
		.then((data) => {
			setHistorial(data)
			console.log(data)
		})
	}, [])

	return(
		<table>
			<tr className="titulos">
				<th>ID</th>
				<th>Fecha</th>
				<th>Asistencia</th>
			</tr>
		</table>
	)

}
