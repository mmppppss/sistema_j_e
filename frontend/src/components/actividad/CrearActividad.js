import React, { useState } from 'react';
import './CrearActividad.css';

const CrearActividad = () => {
	const [message, setMessage] = useState(' ');
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fecha: '',
        hora: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
	const form = new URLSearchParams(formData);
    const handleSubmit = (e) => {
        e.preventDefault();
		fetch('http://100.25.250.69/actividad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: form.toString(),
		})
		.then((response) => response.json())
		.then((data) => {
			alert("Actividad registrada ");
			setMessage(data.message);
		})
		.catch((error) => {
			alert("Error al registrar la actividad");
			setMessage('Error del servidor: '+error);
		});

    };

    return (
        <form className="crear-actividad-form" onSubmit={handleSubmit}>
            <h2>Crear Actividad</h2>
            <label className="crear-actividad-label">
                Nombre:
                <input 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    className="crear-actividad-input"
                    required 
                />
            </label>
            <label className="crear-actividad-label">
                Descripción:
                <textarea 
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                    className="crear-actividad-textarea"
                    required 
                />
            </label>
            <label className="crear-actividad-label">
                Fecha:
                <input 
                    type="date" 
                    name="fecha" 
                    value={formData.fecha} 
                    onChange={handleChange} 
                    className="crear-actividad-input"
                    required 
                />
            </label>
            <label className="crear-actividad-label">
                Hora:
                <input 
                    type="time" 
                    name="hora" 
                    value={formData.hora} 
                    onChange={handleChange} 
                    className="crear-actividad-input"
                    required 
                />
            </label>
			<span>{message}</span>
            <button type="submit" className="crear-actividad-button">Crear Actividad</button>
        </form>
    );
};

export default CrearActividad;
