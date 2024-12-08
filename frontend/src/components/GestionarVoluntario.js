import React from "react"
import { useState, useEffect } from 'react';
export function ActividadVoluntario(){
    return(<>
        <form action="">
			<span>nombre cargdado de la db</span>
        	<input type="numeral" placeholder="id voluntariado a actividad"/>
        	<input type="numeral" placeholder="nombre de la actividad"/>
        	<input type="numeral" placeholder="descripcion actividad"/>
        	<input type="text" placeholder="fecha"/> 
            <input type="text" placeholder="hora"/> 
        </form>
    </>)
}
export function MateriaVoluntario(){
    return(<>
        <form action="">
			<span>nombre cargdado de la db</span>
        	<input type="numeral" placeholder="id voluntariado de materia"/>
            <input type="numeral" placeholder="nombre de la materia"/>
        	<input type="text" placeholder="fecha"/> 
            <input type="text" placeholder="hora"/> 
        </form>
    </>)
}