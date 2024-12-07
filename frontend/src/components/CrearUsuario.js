import React from "react"
import { useState, useEffect } from 'react';
import "./Login.css";

export default function CrearUsuario(props) {
	const [nombre, setNombre] = useState('')
  	const [password, setPassword] = useState('')
  	const [passwordRepeat, setPasswordRepeat] = useState('')
	const [nombreError, setNombreError] = useState('')
  	const [passwordError, setPasswordError] = useState('')
	const [permisos, setPermisos] = useState(-1)
	const [message, setMessage] = useState('')
	const ValidarUsuario = () => {
		setNombreError('')
		setPasswordError('')

		if ('' === nombre) {
			setNombreError('Por favor ingrese un usuario')
			return
		}

		if ('' === password || '' === passwordRepeat) {
			setPasswordError('Por favor ingrese una contraseña')
			return
		}

		if (password !== passwordRepeat) {
			setPasswordError('Las contraseñas no coinciden')
			return
		}
		if (password.length < 1) {
			setPasswordError('La contraseña debe tener al menos 7 caracteres')
			return
		}
			
		var data =new URLSearchParams({
			username: nombre,
			password: password,
			permission: permisos
		} );
		fetch('http://100.25.250.69/usuario', {
    		method: 'POST',
			headers: {
        		'Content-Type': 'application/x-www-form-urlencoded', // Formato del formulario
    		},
    		body: data.toString(),
		})
    	.then((response) => {
        	if (!response.ok) {
            	setPasswordError(response.statusText);
        	}
			return response.json()
    	}).then((data) => {
			setMessage(data.message)
    	})
    	.catch((error) => {
        	setPasswordError("Error del servidor");
    	});
	}

	return (
		<div className="contenedor">
		<div className="contenedorImagen">
		<img className="imagen" src="media/imagen2.jpg" alt=""/>
		</div>
		<div className="contenedorFormulario">
		<form action="">
		<span className="labelLogin">Crear Usuario</span>
		<input 
		type="text"
		placeholder="Usuario"
		onChange={
			(ev) => setNombre(ev.target.value)
		}/>
		<label className="errorLabel">{nombreError}</label>
		<input 
		type="password"
		placeholder="Contraseña"
		onChange={
			(ev) => setPassword(ev.target.value)
		}/>
		<input 
		type="password"
		placeholder="Repetir Contraseña"
		show="false"
		onChange={
			(ev) => setPasswordRepeat(ev.target.value)
		}/>

		<select id="permisos" name="permisos" onChange={(ev) => setPermisos(ev.target.value)}>
			<option value="0">Administrador</option>
			<option value="1">Profesor</option>
			<option value="2">Voluntario</option>
			<option value="3">Medico</option>
		</select>
		<label className="errorLabel">{passwordError}</label>
		<label className="messageLabel">{message}</label>

		<input
		type="button"
		value="CREAR"
		onClick={ValidarUsuario}
		/>
		</form>
		</div>
		</div>
	)
} 
