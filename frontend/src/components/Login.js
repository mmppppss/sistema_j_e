import React from "react"
import { useState, useEffect } from 'react';
import "./Login.css";



export default function Login(props) {
	const [nombre, setNombre] = useState('')
  	const [password, setPassword] = useState('')
	const [nombreError, setNombreError] = useState('')
  	const [passwordError, setPasswordError] = useState('')
	const ValidarSesion = () => {
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
			
		fetch('http://54.91.79.235/login.php?username='+nombre+'&password='+password)
			.then((response) => response.json())
			.then((data) => {
				if (data.session) {
					const tiempoExpiracion = new Date().getTime() + 3000;
					localStorage.setItem('session', JSON.stringify({ data, expiresAt: tiempoExpiracion }));
                    props.iniciarSession(data); // Guarda la sesión
                    window.location.href = '/inicio'; // Redirige a /inicio
                } else {
                    setPasswordError(data.message || 'Usuario o contraseña incorrectos');
                }
			})
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
