import { useState, useEffect } from 'react';
import './css/App.css';
import Login from "./components/Login";
import Botones from "./components/botones"
import Asistencia from './components/Asistencia';
import AnalisisMedico from './components/AnalisisMedico';
import HistorialMedico from './components/HistorialMedico';
import CrearUsuario from './components/CrearUsuario';
import {Error404, Error401} from './components/404'
import {ActividadVoluntario, MateriaVoluntario} from './components/GestionarVoluntario';
//Actividad
import CrearActividad from './components/actividad/CrearActividad';
import ActualizarActividad from './components/actividad/ActualizarActividad';
import Actividad from './components/actividad/Actividad';
//niños
import CrearNino from './components/niño/CrearNiño';
import Lista from "./components/niño/Niños"
//materias
import CrearMateria from './components/materia/CrearMateria';
import Materias from './components/materia/Materia';
//tutor
//import CrearTutor from './components/tutor/CrearTutor';
import Tutor from './components/tutor/Tutor';
import Personal from './components/personal/Personal';
function App() {
	const [session, setSession] = useState([])
	const [ruta, setRuta] = useState([])

	useEffect(()=>{
		setRuta(window.location.pathname.split("/")[1])
		console.log (ruta)
		const storedSession = localStorage.getItem('session');
        if (storedSession) {
			const sessionData = JSON.parse(storedSession);
			if (new Date().getTime() > sessionData.expiresAt) {
            	localStorage.removeItem('session'); 
				setSession({ session: false });
        	} else {
            	setSession(sessionData.data);
        	}
        } else {
            setSession({ session: false });
        }
		},[]);
	var content=null;
	var logo=null;
	if(session.session){
		logo=<img className="logo" src="logo192.png" alt=""/>
		switch (ruta){
			case "":
			case "inicio":
				content=<Botones permission={session.permission}></Botones>
			break
			case "login":
				content=<Login iniciarSession={setSession}/>
				logo=null
			break

			//niños
			case "ninos":
				content=<Lista/>
			break
			case "crearnino":
				if(session.permission==0){
					content=<CrearNino/>
				}else{
					content=<Error401/>
				}
			break
			case "actualizarnino":
				if(session.permission==0){
					content=<CrearNino ninoId={window.location.pathname.split("/")[2]}/>
				}else{
					content=<Error401/>
				}
			break
				
			//actividad
			case "actividades":
				content=<Actividad/>
			break
			case "crearactividad":
				if(session.permission==0){
					content=<CrearActividad/>
				}else{
					content=<Error401/>
				}
			break
			case "actualizaractividad":
				if(session.permission==0){
					content=<ActualizarActividad actividadId={window.location.pathname.split("/")[2]}/>
				}else{
					content=<Error401/>
				}
			break

			//personal
			case "crearusuario":
				if(session.permission==0){
					content=<CrearUsuario/>
				}else{
					content=<Error401/>
				}
			break

			//materias
			case "materias":
				content=<Materias/>
				//content=<MateriaVoluntario/>
			break
			case "crearmateria":
				if(session.permission==0){
					content=<CrearMateria/>
				}else{
					content=<Error401/>
				}
			break
			case "materiaactividad":
				if(session.permission==0){
					content=<CrearMateria materiaId={window.location.pathname.split("/")[2]}/>
				}else{
					content=<Error401/>
				}
			break

			//tutor
			case "tutor":
				content=<Tutor/>
			break

			//personal
			case "personal":
				content=<Personal/>
			break
			case "asistencia":
				content=<Asistencia/>
			break
			case "analisis":
				content=<AnalisisMedico/>
			break
			case "historialmedico":
				content=<HistorialMedico/>
			break
			case "analisis":
				content=<AnalisisMedico/>
			break

			default:
				content=<Error404/>
			break
		}
	}else{
		content=<Login iniciarSession={setSession}></Login>
	}
	
	return (
		<div className="App">
			{logo}
			{content}
		<div class="footer-basic">
		<footer>
		<div class="social">
			<a href="mailto:info@joven-esperanza.de"> <img src="media/envelope-fill.svg" alt=""/></a>
			<a href="https://www.linkedin.com/company/joven-esperanza-e.v./"><img src="media/linkedin.svg"/></a>
			<a href="https://www.instagram.com/joven_esperanza_ev/"><img src="media/instagram.svg"/></a>
			<a href="https://www.facebook.com/JovenEsperanza"><img src="media/facebook.svg"/></a>
		</div>
		<ul class="list-inline">
		<li class="list-inline-item"><a href="#">Inicio</a></li>
		<li class="list-inline-item"><a href="#">Sobre nosotros</a></li>
		</ul>
		<p class="copyright">Joven Esperanza © 2024</p>
		</footer>
		</div>
		</div>
	);
}

export default App;
