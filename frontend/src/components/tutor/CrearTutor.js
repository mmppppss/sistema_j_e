import React, { useState, useEffect } from "react";
import "../Login.css";

export default function CrearTutor({ tutorId }) {
    const [formData, setFormData] = useState({
        ci: '',
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        sexo: '',
        telefono: '',
        correo: '',
        direccion: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (tutorId) {
            const fetchTutorData = async () => {
                try {
                    const response = await fetch(`http://100.25.250.69/tutor/${tutorId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setFormData((prev) => ({ ...prev, ...data }));
                    } else {
                        console.error('Error al cargar los datos del tutor');
                    }
                } catch (error) {
                    console.error('Error en la conexión con el servidor:', error);
                }
            };
            fetchTutorData();
        }
    }, [tutorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica de campos
        if (!formData.ci || !formData.nombre || !formData.apellido_pat) {
            setErrors({ general: "Los campos CI, Nombre y Apellido Paterno son obligatorios." });
            return;
        }

        const method = tutorId ? 'PUT' : 'POST';
        const url = tutorId
            ? `http://100.25.250.69/tutor/${tutorId}`
            : 'http://100.25.250.69/tutor';

        try {
			if(tutorId){
				fetch(url, {
				method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            }).then((response) => {
				if (response.ok) {
					setMessage(`El tutor ha sido ${tutorId ? 'actualizado' : 'registrado'} correctamente.`);
					alert(`El tutor ha sido ${tutorId ? 'actualizado' : 'registrado'} correctamente.`);					
				}	            
            });
			}else{
				const data = new URLSearchParams(formData);
				fetch(url, {
				method: method,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: data.toString(),
			}).then((response) => {
				if (response.ok) {
					setMessage(`El tutor ha sido ${tutorId ? 'actualizado' : 'registrado'} correctamente.`);
					alert(`El tutor ha sido ${tutorId ? 'actualizado' : 'registrado'} correctamente.`);					
				}
			})
			}
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    };

    return (
		<div className="contenedor">
		<div className="contenedorImagen">
			<img src="media/imagen2.webp" alt=""/>
		</div>
		<div className="contenedorFormulario">
        <form className="crear-tutor-form" onSubmit={handleSubmit}>
            <h2>{tutorId ? 'Actualizar Tutor' : 'Registrar Tutor'}</h2>
            {errors.general && <p className="error">{errors.general}</p>}
            {message && <p className="success">{message}</p>}


            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
		<div className="filasCampos">
            <input
                type="text"
                name="apellido_pat"
                value={formData.apellido_pat}
                onChange={handleChange}
                placeholder="Apellido Paterno"
                required
            />
            <input
                type="text"
                name="apellido_mat"
                value={formData.apellido_mat}
                onChange={handleChange}
                placeholder="Apellido Materno"
            />
		</div>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                <option value="">Sexo</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
            </select>
 			<div className="filasCampos">
			<input
                type="text"
                name="ci"
                value={formData.ci}
                onChange={handleChange}
                placeholder="CI"
                required
            />
            <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
            />
		</div>
            <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo Electrónico"
            />
            <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección"
            />
            <input type="button"
				onClick={handleSubmit}
                value={tutorId ? 'Actualizar Tutor' : 'Registrar Tutor'}/>
        </form>
	</div>
		</div>
    );
}
