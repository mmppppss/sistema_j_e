import React from "react"
import { useState, useEffect } from 'react';
import "./Login.css";

export default function CrearUsuario(props) {
	const [nombre, setNombre] = useState('')
  	const [password, setPassword] = useState('')
	const [nombreError, setNombreError] = useState('')
  	const [passwordError, setPasswordError] = useState('')
	const [permisos, setPermisos] = useState(-1)
	const ValidarUsuario = () => {
		setNombreError('')
		setPasswordError('')

		if ('' === nombre) {
			setNombreError('Por favor ingrese un usuario')
			return
		}

		if ('' === password) {
			setPasswordError('Por favor ingrese una contraseña')
			return
		}

		if (password.length < 1) {
			setPasswordError('La contraseña debe tener al menos 7 caracteres')
			return
		}
			
		fetch('http://100.25.250.69/usuario',
			method=	'POST',
			body=JSON.stringify({
				username: nombre,
				password: password,
				permission: permisos
				})
			)
			.then((response) => if	(response.ok) {
				setPasswordError("Usuario creado con exito");
			}
			.catch((error) => {
				setPasswordError("Error del servidor");
			});
	}

	return (
		<div className="contenedor">
		<div className="contenedorImagen">
		<img className="logo" src="logo192.png" alt=""/>
		<img className="imagen" src="media/imagen1.jpg" alt=""/>
		</div>
		<div className="contenedorFormulario">
		<form action="">
		<span className="labelLogin">Iniciar Sesion</span>
		<input 
		type="text"
		placeholder="Usuario"
		onChange={
			(ev) => setNombre(ev.target.value)
		}/>
		<label className="errorLabel">{nombreError}</label>
		<input 
		type="password"
		placeholder="*********"
		onChange={
			(ev) => setPassword(ev.target.value)
		}/>
		<select id="permisos" name="permisos" onChange={(ev) => setPermisos(ev.target.value)}>
			<option value="0">Administrador</option>
			<option value="1">Profesor</option>
			<option value="2">Voluntario</option>
			<option value="3">Medico</option>
		</select>
		<label className="errorLabel">{passwordError}</label>

		<input
		type="button"
		value="INICIAR"
		onClick={ValidarSesion}
		/>
		</form>
		</div>
		</div>
	)
} 
