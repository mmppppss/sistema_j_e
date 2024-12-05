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
		},
		lista:{
			name:"Ver lista",
			route:"/lista"
		},
		historialMedico:{
			name:"Ver historial medico",
			route:"/historialmedico"
		},
		gesActividades:{
			name:"Gestionar actividades",
			route:"/actividades"
		},
		gesNiños:{
			name:"Gestionar niños",
			route:"/niños"
		},
		gesTutores:{
			name:"Gestionar tutores",
			route:"/tutores"
		},
		gesMaterias:{
			name:"Gestionar materias",
			route:"/materias"
		},
		gesVoluntario:{
			name:"Gestionar voluntario",
			route:"/voluntario"
		}
	}
	if(permission == 0){//administrados
		return [botones.niño, botones.gesActividades, botones.gesNiños,botones.gesTutores]
	}else if(permission == 1){//maestro
		return [botones.gesMaterias]
	}else if(permission==2){//medico
		return[botones.historialMedico]
	}else if(permission==3){
		return[botones.gesActividades, botones.gesMaterias]
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
