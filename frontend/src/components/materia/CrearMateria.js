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

  const [profesores, setProfesores] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
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
          } else {
            console.error("Error al cargar los datos de la materia");
          }
        } catch (error) {
          console.error("Error en la conexión con el servidor:", error);
        }
      };
      fetchMateriaData();
    }

	fetch("http://100.25.250.69/profesor")
	  .then((response) => response.json())
	  .then((data) => {
		setProfesores(data);
	  });

	fetch("http://100.25.250.69/voluntario")
	  .then((response) => response.json())
	  .then((data) => {
		setVoluntarios(data);
	  });
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
		<select id="id_profesor" name="id_profesor" onChange={handleChange} value={formData.id_profesor}>
			<option value="Seleccione..."></option>
			{profesores.map((profesor) => (
				<option key={profesor.id} value={profesor.id}>
					{profesor.nombre} {profesor.apellido_pat} {profesor.apellido_mat}
				</option>
			))}
		</select>
		</label>

		<label className="crear-materia-label">
		Voluntario:
		<select id="id_voluntario" name="id_voluntario" onChange={handleChange} value={formData.id_voluntario}>
			<option value="Seleccione..."></option>
			{voluntarios.map((voluntario) => (
				<option key={voluntario.id} value={voluntario.id}>
					{voluntario.nombre} {voluntario.apellido_pat} {voluntario.apellido_mat}
				</option>
			))}
		</select>
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
