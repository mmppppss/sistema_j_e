import { useState, useEffect } from 'react';
import './css/App.css';
import Login from "./components/Login";
import Botones from "./components/botones"
import Lista from "./components/listaNiño"
import Asistencia from './components/Asistencia';
import HistorialMedico from './components/HistorialMedico';

function App() {
	const [session, setSession] = useState([])
	const [ruta, setRuta] = useState([])

	useEffect(()=>{
		setRuta(window.location.pathname.split("/")[1])
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
			case "inicio":
				content=<Botones permission={session.permission}></Botones>
			break 
			case "lista":
				content=<Lista/>
			break
			case "login":
				content=<Login iniciarSession={setSession}/>
				logo=null
			break
			case "asistencia":
				content=<Asistencia/>
			break
			case "historialmedico":
				content=<HistorialMedico/>
			break
			default:
				content=<h1>cargar 404</h1>
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
