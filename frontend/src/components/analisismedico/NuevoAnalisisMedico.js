import React, { useState } from 'react';
import '../Login.css';

const NuevoAnalisisMedico = (props) => {
    const [formData, setFormData] = useState({
        id_niño: '',
        id_medico: '',
        temperatura: '',
        pulso: '',
        presion: '',
        observacion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://100.25.250.69/historial'; // Cambia la URL según tu API
        const method = 'POST';

        try {
			const data = new URLSearchParams(formData);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data.toString(),
            });

            if (response.ok) {
                alert('Análisis médico registrado exitosamente.');
            } else {
                console.error('Error al registrar el análisis médico');
                alert('Hubo un error al registrar el análisis médico.');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
            alert('No se pudo conectar con el servidor.');
        }
    };

    return (
		<>
        <form className="crear-analisis-form" onSubmit={handleSubmit}>
            <h2>Registrar Análisis Médico</h2>

            <label className="crear-analisis-label">
                ID Niño:
                <input
                    type="text"
                    name="id_niño"
                    value={formData.id_niño}
                    onChange={handleChange}
                    className="crear-analisis-input"
                    required
                />
            </label>

            <label className="crear-analisis-label">
                ID Médico:
                <input
                    type="text"
                    name="id_medico"
                    value={formData.id_medico}
                    onChange={handleChange}
                    className="crear-analisis-input"
                    required
                />
            </label>

            <label className="crear-analisis-label">
                Temperatura (°C):
                <input
                    type="number"
                    name="temperatura"
                    value={formData.temperatura}
                    onChange={handleChange}
                    className="crear-analisis-input"
                    required
                />
            </label>

            <label className="crear-analisis-label">
                Pulso (bpm):
                <input
                    type="number"
                    name="pulso"
                    value={formData.pulso}
                    onChange={handleChange}
                    className="crear-analisis-input"
                    required
                />
            </label>

            <label className="crear-analisis-label">
                Presión (mmHg):
                <input
                    type="text"
                    name="presion"
                    value={formData.presion}
                    onChange={handleChange}
                    className="crear-analisis-input"
                    required
                />
            </label>

            <label className="crear-analisis-label">
                Observaciones:
                <textarea
                    name="observacion"
                    value={formData.observacion}
                    onChange={handleChange}
                    className="crear-analisis-textarea"
                    required
                ></textarea>
            </label>

            <button type="submit" className="crear-analisis-button">
                Registrar Análisis
            </button>
        </form>
		</>
    );
};

export default NuevoAnalisisMedico;
