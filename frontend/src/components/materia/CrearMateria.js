import React, { useState, useEffect } from "react";
import "./Materia.css";

const CrearMateria = (props) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    id_profesor: "",
    id_voluntario: "",
    descripcion: "",
    fecha: "",
    hora: "",
  });

  useEffect(() => {
    if (props.materiaId) {
      const fetchMateriaData = async () => {
        try {
          const response = await fetch(
            `http://100.25.250.69/materia/${props.materiaId}`
          );
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
            console.log(data);
          } else {
            console.error("Error al cargar los datos de la materia");
          }
        } catch (error) {
          console.error("Error en la conexión con el servidor:", error);
        }
      };
      fetchMateriaData();
    }
  }, [props.materiaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = props.materiaId ? "PUT" : "POST";
    const url = props.materiaId
      ? `http://100.25.250.69/materia/${props.materiaId}`
      : "http://100.25.250.69/materia";

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
				alert('Los datos de la materia han sido actualizados');
			} else {
				console.error('Error al actualizar los datos de materia');
			}
		}else if (method === 'POST'){
			const data = new URLSearchParams({

				nombre: formData.nombre,
				id_profesor: formData.id_profesor,
				id_voluntario: formData.id_voluntario,
				descripcion: formData.descripcion,
				fecha: formData.fecha,
				hora: formData.hora,

			});
			const response = await fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: data.toString(),
			});
			if (response.ok) {
				alert('Materia registrada');
			} else {
				console.error('Error al registrar los datos de materia');
			}
		}
	} catch (error) {
		console.error('Error en el servidor:', error);
		alert('No se pudo conectar con el servidor');
	}

  };

	return (
		<form className="crear-materia-form" onSubmit={handleSubmit}>
		<h2>{props.materiaId ? "Actualizar Materia" : "Registrar Materia"}</h2>

		<label className="crear-materia-label">
		Nombre:
		<input
		type="text"
		name="nombre"
		value={formData.nombre}
		onChange={handleChange}
		className="crear-materia-input"
		required
		/>
		</label>

		<label className="crear-materia-label">
		Profesor:
		<input
		type="text"
		name="id_profesor"
		value={formData.id_profesor}
		onChange={handleChange}
		className="crear-materia-input"
		required
		/>
		</label>

		<label className="crear-materia-label">
		Voluntario:
		<input
		type="text"
		name="id_voluntario"
		value={formData.id_voluntario}
		onChange={handleChange}
		className="crear-materia-input"
		required
		/>
		</label>

		<label className="crear-materia-label">
		Descripción:
		<textarea
		name="descripcion"
		value={formData.descripcion}
		onChange={handleChange}
		className="crear-materia-input"
		required
		/>
		</label>

		<label className="crear-materia-label">
		Fecha:
		<input
		type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="crear-materia-input"
          required
        />
      </label>

      <label className="crear-materia-label">
        Hora:
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          className="crear-materia-input"
          required
        />
      </label>

      <button type="submit" className="crear-materia-button">
        {props.materiaId ? "Actualizar Materia" : "Registrar Materia"}
      </button>
    </form>
  );
};

export default CrearMateria;
