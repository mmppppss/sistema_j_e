import React from "react"
import "./botones.css"

function defineButtons(permission){
	if(permission == 0){
		return ["Ver Niños", "Ver Materias", "Ver Actividades"];
	}else if(permission == 1){//maestro
		return ["Ver Niños", "Ver Materias"];
	}
}

function Boton(nombreBoton){
	return(
		<div className="boton" key={nombreBoton}>
			<input type="submit" value={nombreBoton}/>
		</div>
	)
}
export default function Botones(props){
	var a=defineButtons(props.permission);
	var x=[];
	for(var i of a){
		x.push(Boton(i))
	}
	var resu=<div className="contenedorBotones">{x}</div>
	return resu;

	
}
