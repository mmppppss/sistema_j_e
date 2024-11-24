import { useState, useEffect } from 'react';
import './css/App.css';
import Login from "./components/Login";
import Botones from "./components/botones"
import Lista from "./components/listaNiño"
function iniciarSesion(){
	return {"session":true,"token":"59fd99309ea825cb83c4a20b692fe836721fedcf831fa14b1d9c9983633513f8","username":"pedro"}
}
function App() {
	const [session, setSession] = useState([])
	const [ruta, setRuta] = useState([])
	/*
		useEffect(() => {
		fetch('http://54.91.79.235/login.php?username=pedro&password=pedro')
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data)
			})
	}, [])
	*/
	useEffect(()=>{
		setRuta(window.location.pathname)
	},[]);
	var content=null;
	var logo=null;
	if(iniciarSesion().session){
		logo=<img className="logo" src="logo192.png" alt=""/>
		switch (ruta){
			case "/inicio":
				content=<Botones></Botones>
			break 
			case "/lista":
				content=<Lista/>
			break
			case "/login":
				content=<Login/>
				logo=null
			break
			default:
				content=<h1>alt</h1>
			break
		}
	}else{
		content=<Login></Login>
	}
	
	return (
		<div className="App">
			{logo}
			{content}
		</div>
	);
}

export default App;
