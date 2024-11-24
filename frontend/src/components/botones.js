import React from "react"
import "./botones.css"



function Boton(nombreBoton){
	return(
		<div className="boton" key={nombreBoton}>
			<input type="submit" value={nombreBoton}/>
		</div>
	)
}
export default function Botones(props){
	var a=["hola","actividad","pedro","meli","kia","meli mala", "malal"]
	var x=[];
	for(var i of a){
		x.push(Boton(i))
	}
	var resu=<div className="contenedorBotones">{x}</div>
	return resu;

	
}
