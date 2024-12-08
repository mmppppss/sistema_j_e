import React, { useState, useEffect } from 'react';
import './CrearNiño.css';

const CrearNiño = (props) => {
    const [formData, setFormData] = useState({
		id: '',
		id_tutor: '',
        nombre: '',
        ci: '',
        apellido_pat: '',
        apellido_mat: '',
        fecha_nacimiento: '',
        telefono: '',
        sexo: '',
    });

    useEffect(() => {
        if (props.ninoId) {
            const fetchNiñoData = async () => {
                try {
                    const response = await fetch(`http://100.25.250.69/ninos/${props.ninoId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setFormData(data);
						console.log(data);
                    } else {
                        console.error('Error al cargar los datos del niño');
                    }
                } catch (error) {
                    console.error('Error en la conexión con el servidor:', error);
                }
            };
            fetchNiñoData();
        }
    }, [props.ninoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = props.ninoId ? 'PUT' : 'POST';
        const url = props.ninoId
            ? `http://100.25.250.69/ninos/${props.ninoId}`
            : 'http://100.25.250.69/ninos';

        try {
        	if(method === 'PUT'){
				const response = await fetch(url, {
					method: method,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});
				
				if (response.ok) {
					alert('Los datos del niño han sido actualizados');
				} else {
					console.error('Error al actualizar los datos del niño');
				}
        	}else if (method === 'POST'){
				const data = new URLSearchParams({
					nombre: formData.nombre,
					ci: formData.ci,
					apellido_pat: formData.apellido_pat,
					apellido_mat: formData.apellido_mat,
					fecha_nacimiento: formData.fecha_nacimiento,
					telefono: formData.telefono,
					sexo: formData.sexo,
					id_tutor: formData.id_tutor
				});
				const response = await fetch(url, {
					method: method,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: data.toString(),
				});
				if (response.ok) {
					alert('Los datos del niño han sido registrados');
				} else {
					console.error('Error al registrar los datos del niño');
				}
        	}
		} catch (error) {
			console.error('Error en el servidor:', error);
			alert('No se pudo conectar con el servidor');
		}
	};

	return (
		<form className="crear-nino-form" onSubmit={handleSubmit}>
		<h2>{props.ninoId ? 'Actualizar Niño' : 'Registrar Niño'}</h2>
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
		name="apellido_pat"
		value={formData.apellido_pat}
		onChange={handleChange}
		className="crear-nino-input"
		required
		/>
		</label>
		<label className="crear-nino-label">
		Apellido Materno:
		<input
		type="text"
		name="apellido_mat"
		value={formData.apellido_mat}
		onChange={handleChange}
		className="crear-nino-input"
		required
		/>
		</label>
		<label className="crear-nino-label">
		Fecha de Nacimiento:
		<input
		type="date"
		name="fecha_nacimiento"
		value={formData.fecha_nacimiento}
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
        <option value="">Seleccione...</option>
		<option value="m">Masculino</option>
		<option value="f">Femenino</option>
        </select>

		</label>
            <button type="submit" className="crear-nino-button">
                {props.ninoId ? 'Actualizar Niño' : 'Registrar Niño'}
            </button>
        </form>
    );
};

export default CrearNiño;
