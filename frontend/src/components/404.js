import React from 'react';
import './Error404.css';

export const Error404 = () => {
    return (
        <div className="contenedor">
            <div className="contenedorImagen">
                <img 
                    src="https://via.placeholder.com/300x300.png?text=404" 
                    alt="404 Not Found" 
                    className="imagen"
                />
            </div>
            <div className="contenedorFormulario">
                <h1 className="titulo404">Página no encontrada</h1>
                <p className="mensaje404">Lo sentimos, la página que estás buscando no existe.</p>
                <a href="/inicio" className="botonVolver">Volver al inicio</a>
            </div>
        </div>
    );
};

export const Error401 =()=>{
	return (
        <div className="contenedor">
            <div className="contenedorImagen">
                <img 
                    src="https://via.placeholder.com/300x300.png?text=401" 
                    alt="404 Not Found" 
                    className="imagen"
                />
            </div>
            <div className="contenedorFormulario">
                <h1 className="titulo404">Página No Autorizada </h1>
                <p className="mensaje404">No deberias estar aquí</p>
                <a href="/inicio" className="botonVolver">Volver al inicio</a>
            </div>
        </div>
	)
}
