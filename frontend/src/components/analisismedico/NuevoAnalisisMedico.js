import React, { useState } from 'react';
import './NuevoAnalisisMedico.css';

const NuevoAnalisisMedico = () => {
	const [message, setMessage] = useState(' ');
    const [formData, setFormData] = useState({
        id: '',
        ci: '',
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        sexo: '',
        fechaNacimiento: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
		fetch('/analisismedico', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(),
		})
		.then((response) => response.json())
		.then((data) => {
			setMessage(data.message);
		})
		.catch((error) => {
			setMessage('Error del servidor: '+error);
		});

    };

    return (
        <form className="Nuevo-Analisis-Medico-form" onSubmit={handleSubmit}>
            <h2>Nuevo Analisis Medico</h2>
            <label className="Nuevo-Analisis-Medico-label">
                Nombre:
                <input 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    className="Nuevo-Analisis-Medico-input"
                    required 
                />
            </label>
            <label className="Nuevo-Analisis-Medico-label">
                Descripción:
                <textarea 
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                    className="nuevo-analisis-medico-textarea"
                    required 
                />
            </label>
			<span>{message}</span>
            <button type="submit" className="Nuevo-Analisis-Medico-button">Crear AnalisisMedico</button>
        </form>
    );
};

export default NuevoAnalisisMedico;
