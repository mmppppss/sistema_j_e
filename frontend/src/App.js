import { useState, useEffect } from 'react';
import './css/App.css';
import Login from "./components/Login";
import Botones from "./components/botones"
import Lista from "./components/listaNiño"

function App() {
	const [session, setSession] = useState([])
	const [ruta, setRuta] = useState([])



	useEffect(()=>{
		setRuta(window.location.pathname)
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
			case "/inicio":
				content=<Botones></Botones>
			break 
			case "/lista":
				content=<Lista/>
			break
			case "/login":
				content=<Login iniciarSession={setSession}/>
				logo=null
			break
			default:
				content=<h1>alt</h1>
			break
		}
	}else{
		content=<Login iniciarSession={setSession}></Login>
	}
	
	return (
		<div className="App">
			{logo}
			{content}
		</div>
	);
}

export default App;
