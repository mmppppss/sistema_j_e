import React, { useState, useEffect } from 'react';
import './ActualizarActividad.css';

const ActualizarActividad = ({ actividadId }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fecha: '',
        hora: '',
    });

    // Cargar datos de la actividad existente
    useEffect(() => {
        // Simular una petición GET para obtener los datos actuales
        const fetchActividad = async () => {
            try {
                const response = await fetch(`http://localhost:3000/actividades/${actividadId}`);
                const data = await response.json();
                setFormData({
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    fecha: data.fecha,
                    hora: data.hora,
                });
            } catch (error) {
                console.error('Error al cargar la actividad:', error);
            }
        };

        fetchActividad();
    }, [actividadId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/actividades/${actividadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Actividad actualizada con éxito');
            } else {
                alert('Error al actualizar la actividad');
            }
        } catch (error) {
            console.error('Error al actualizar la actividad:', error);
            alert('Error al comunicarse con el servidor');
        }
    };

    return (
        <form className="actualizar-actividad-form" onSubmit={handleSubmit}>
            <h2>Actualizar Actividad</h2>
            <label className="actualizar-actividad-label">
                Nombre:
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="actualizar-actividad-input"
                    required
                />
            </label>
            <label className="actualizar-actividad-label">
                Descripción:
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="actualizar-actividad-textarea"
                    required
                />
            </label>
            <label className="actualizar-actividad-label">
                Fecha:
                <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="actualizar-actividad-input"
                    required
                />
            </label>
            <label className="actualizar-actividad-label">
                Hora:
                <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="actualizar-actividad-input"
                    required
                />
            </label>
            <button type="submit" className="actualizar-actividad-button">
                Actualizar Actividad
            </button>
        </form>
    );
};

export default ActualizarActividad;
