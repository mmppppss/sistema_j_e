import React from "react"
import "./Login.css";
export default function Login(){
	return (
		<div className="contenedor">
			<div className="contenedorImagen">
				<img className="logo" src="logo192.png" alt=""/>
				<img className="imagen" src="media/imagen1.jpg" alt=""/>
			</div>
			<div className="contenedorFormulario">
				<form action="">
					<span className="labelLogin">Iniciar Sesion</span>
					<input type="text" placeholder="Usuario"/>
					<input type="password" placeholder="*********"/>
					<input type="submit" value="INICIAR"/>
				</form>
			</div>
		</div>
	)
} 
