import React, { useState } from 'react';
import './CrearNiño.css';

const CrearNiño = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        ci: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        telefono: '',
        sexo: '',
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

        try {
            const response = await fetch('http://localhost:3000/ninos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Niño registrado con éxito');
                setFormData({
                    nombre: '',
                    ci: '',
                    apellidoPaterno: '',
                    apellidoMaterno: '',
                    fechaNacimiento: '',
                    telefono: '',
                    sexo: '',
                });
            } else {
                alert('Error al registrar el niño');
            }
        } catch (error) {
            console.error('Error en el servidor:', error);
            alert('No se pudo conectar con el servidor');
        }
    };

    return (
        <form className="crear-nino-form" onSubmit={handleSubmit}>
            <h2>Registrar Niño</h2>
            <label className="crear-nino-label">
                Nombre:
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="crear-nino-input"
                    required
                />
            </label>
            <label className="crear-nino-label">
                Carnet de Identidad:
                <input
                    type="text"
                    name="ci"
                    value={formData.ci}
                    onChange={handleChange}
                    className="crear-nino-input"
                    required
                />
            </label>
            <label className="crear-nino-label">
                Apellido Paterno:
                <input
                    type="text"
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                    className="crear-nino-input"
                    required
                />
            </label>
            <label className="crear-nino-label">
                Apellido Materno:
                <input
                    type="text"
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                    className="crear-nino-input"
                    required
                />
            </label>
            <label className="crear-nino-label">
                Fecha de Nacimiento:
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className="crear-nino-input"
                    required
                />
            </label>
            <label className="crear-nino-label">
                Teléfono:
                <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="crear-nino-input"
                    required
                />
            </label>
            <label className="crear-nino-label">
                Sexo:
                <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    className="crear-nino-select"
                    required
                >
                    <option value="">Seleccione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </label>
            <button type="submit" className="crear-nino-button">
                Registrar Niño
            </button>
        </form>
    );
};

export default CrearNiño;
