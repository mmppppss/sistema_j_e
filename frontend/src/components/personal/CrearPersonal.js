import React, { useState, useEffect } from "react";
import "../Login.css";

export default function CrearPersonal({ personalId }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        ci: '',
        telefono: '',
        correo: '',
        sexo: '',
        direccion: '',
        username: '',
        password: '',
        passwordRepeat: '',
        permission: -1
    });

    const [errors, setErrors] = useState({
        nombreError: '',
        passwordError: '',
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (personalId) {
            const fetchPersonalData = async () => {
                try {
                    const response = await fetch(`http://100.25.250.69/personal/${personalId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setFormData((prev) => ({ ...prev, ...data }));
                    } else {
                        console.error('Error al cargar los datos del personal');
                    }
                } catch (error) {
                    console.error('Error en la conexión con el servidor:', error);
                }
            };
            fetchPersonalData();
        }
    }, [personalId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validarUsuario = () => {
        const { nombre, apellido_pat, apellido_mat, ci, telefono, correo, sexo, direccion, password, passwordRepeat } = formData;
        setErrors({ nombreError: '', passwordError: '' });

        if (!nombre || !apellido_pat || !apellido_mat || !ci || !telefono || !correo || !sexo || !direccion) {
            setErrors((prev) => ({ ...prev, nombreError: 'Por favor, complete todos los campos' }));
            return;
        }

        if (!password || !passwordRepeat) {
            setErrors((prev) => ({ ...prev, passwordError: 'Por favor ingrese una contraseña' }));
            return;
        }

        if (password !== passwordRepeat) {
            setErrors((prev) => ({ ...prev, passwordError: 'Las contraseñas no coinciden' }));
            return;
        }

        if (password.length < 5) {
            setErrors((prev) => ({ ...prev, passwordError: 'La contraseña debe tener al menos 5 caracteres' }));
            return;
        }

        const data = new URLSearchParams(formData);
		if (!personalId) {
			fetch('http://100.25.250.69/personal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: data.toString(),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((data) => {
					setMessage(data.message);
					alert('Personal creado correctamente');
				})
				.catch((error) => {
            setErrors((prev) => ({ ...prev, passwordError: 'Error del servidor' }));
        	});
		}else{
			fetch(`http://100.25.250.69/personal/${personalId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((data) => {
					alert('Personal actualizado correctamente');
					setMessage("Personal actualizado correctamente");
				})
				.catch((error) => {
					setErrors((prev) => ({ ...prev, passwordError: 'Error del servidor' }));
				});
		}
    };

    return (
        <div className="contenedor">
            <div className="contenedorImagen">
                <img className="imagen" src="media/imagen2.jpg" alt="" />
            </div>
            <div className="contenedorFormulario">
                <form>
                    <span className="labelLogin">Crear Personal</span>

                    <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} value={formData.nombre} />

                    <div className="filaCampos">
                        <input type="text" name="apellido_pat" placeholder="Apellido Paterno" onChange={handleChange} value={formData.apellido_pat} />
                        <input type="text" name="apellido_mat" placeholder="Apellido Materno" onChange={handleChange} value={formData.apellido_mat} />
                    </div>

                    <input type="email" name="correo" placeholder="Correo" onChange={handleChange} value={formData.correo} />
                    <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} value={formData.direccion} />

                    <div className="filaCampos">
                        <input type="text" name="ci" placeholder="CI" onChange={handleChange} value={formData.ci} />
                        <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} value={formData.telefono} />
                    </div>

                    <div className="filaCampos">
                        <select name="sexo" onChange={handleChange} value={formData.sexo}>
                            <option value="">Sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                        <select name="permission" onChange={handleChange} value={formData.permission}>
							<option value="">Permiso</option>
                            <option value="0">Administrador</option>
                            <option value="1">Profesor</option>
                            <option value="2">Voluntario</option>
                            <option value="3">Medico</option>
                        </select>
                    </div>

                    <input type="text" name="username" placeholder="Usuario" onChange={handleChange} value={formData.username} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} />
                    <input type="password" name="passwordRepeat" placeholder="Repetir Contraseña" onChange={handleChange} value={formData.passwordRepeat} />

                    <label className="errorLabel">{errors.nombreError}</label>
                    <label className="errorLabel">{errors.passwordError}</label>
                    <label className="messageLabel">{message}</label>

                    <input type="button" value="CREAR" onClick={validarUsuario} />
                </form>
            </div>
        </div>
    );
}
