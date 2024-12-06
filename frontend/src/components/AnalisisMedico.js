import React from "react"
import { useState, useEffect } from 'react';

export default function AnalisisMedico(){
    return(<>
        <form action="">
			<span>nombre cargdado de la db</span>
        	<input type="numeral" placeholder="27.5"/>
        	<input type="numeral" placeholder="pulso"/>
        	<input type="numeral" placeholder="ritmo cardicaco"/>
        	<input type="numeral" placeholder="presion"/>
        	<input type="text" placeholder="observaciones"/>
        </form>
    </>)
}
