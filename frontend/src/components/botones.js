import React from "react"
import "./botones.css"

function defineButtons(permission){
	var botones={
		niño:{
		name: "Ver Niños",
		route: "/lista"
	},
		asistencia:{
		name: "Ver asistencia",
		route: "/asistencia"
	}}
	if(permission == 0){
		return [botones.niño, botones.asistencia]
	}else if(permission == 1){//maestro
		return [botones.asistencia]
	}
}

function Boton(nombreBoton){
	return(
		<div className="boton" key={nombreBoton.name}>
			<input type="submit" value={nombreBoton.name} onClick={()=>{
				window.location.href = nombreBoton.route
			}}/>
		</div>
	)
}
export default function Botones(props){
	var a=defineButtons(props.permission);
	console.log(a)
	var x=[];
	for(var i of a){
		x.push(Boton(i))
	}
	var resu=<div className="contenedorBotones">{x}</div>
	return resu;

	
}
