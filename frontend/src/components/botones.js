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
		gestAnalisis:{
			name:"Gestionar analisis",
			route:"/analisismedico"
		},
		crearanalisis:{
			name:"Registrar analisis",
			route:"/nuevoanalisis"
		},

		historialMedico:{
			name:"Ver historial medico",
			route:"/historialmedico"
		},
		gesActividades:{
			name:"Gestionar Actividades",
			route:"/actividades"
		},
		gesNiños:{
			name:"Gestionar niños",
			route:"/ninos"
		},
		gesTutores:{
			name:"Gestionar tutores",
			route:"/tutor"
		},
		gesMaterias:{
			name:"Gestionar materias",
			route:"/materias"
		},
		gesVoluntario:{
			name:"Gestionar voluntario",
			route:"/voluntario"
		},/*
		crearUsuario:{
			name:"Crear usuario",
			route:"/crearusuario"
		},*/
		crearActividad:{
			name:"Crear actividad",
			route:"/crearactividad"
		},
		actualizarActividad:{
			name:"Actualizar actividad",
			route:"/actualizaractividad"
		},
		crearNino:{
			name:"Crear niño",
			route:"/crearnino"
		},
		actualizarNino:{
			name:"Actualizar niño",
			route:"/actualizarnino"
		},
		gesPersonal:{
			name:"Gestionar personal",
			route:"/personal"
		}

	}
	if(permission == 0){//administrados
		return [botones.gesNiños, botones.gesActividades, botones.gesTutores, botones.gesMaterias, botones.gesPersonal]
	}else if(permission == 1){//maestro
		return [botones.gesMaterias]
	}else if(permission==2){//voluntario
		return[botones.gesActividades, botones.gesMaterias]
	}else if(permission==3){//medico
		return[botones.gestAnalisis]
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
	var x=[];
	for(var i of a){
		x.push(Boton(i))
	}
	var resu=<div className="contenedorBotones">
		{x}
		<div className="boton">
			<input type="submit" value="Cerrar Sesion" onClick={()=>{
				window.location.href = "/login"
				localStorage.removeItem('session'); 

			}}/>
		</div>
		</div>
	return resu;
}
