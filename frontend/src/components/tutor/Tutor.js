import React, { useState, useEffect } from 'react';
import "../actividad/Actividad.css";

function elemento(tutor, setLista) {
    return (
        <tr key={tutor.id}>
            <td>{tutor.nombre} {tutor.apellido_pat} {tutor.apellido_mat}</td>
            <td>{tutor.telefono}</td>
            <td>{tutor.especialidad}</td>
            <td>
                <input 
                    type="button" 
                    onClick={() => window.location.href = `/actualizartutor/${tutor.id}`} 
                    value="Editar" 
                />
            </td>
            <td>
                <input 
                    type="button" 
                    value="Eliminar"
                    onClick={() => borrarTutor(tutor.id, setLista)} 
                />
            </td>
        </tr>
    );
}

async function borrarTutor(id, setLista) {
    const confirmacion = window.confirm("¿Estás seguro de confirmar el eliminado?");
    if (confirmacion) {
        try {
            const response = await fetch(`http://100.25.250.69/tutores/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setLista(prevLista => prevLista.filter(tutor => tutor.id !== id));
                alert('Tutor eliminado con éxito');
            } else {
                alert('No se pudo eliminar el tutor');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    }
}

export default function Tutor() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        fetch('http://100.25.250.69/tutor')
            .then(response => response.json())
            .then(data => setLista(data))
            .catch(error => console.error('Error al cargar la lista de tutores:', error));
    }, []);

    return (
        <table className="lista-tutor-table">
            <thead>
                <tr className="titulos">
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Especialidad</th>
                    <th></th>
                    <th>
                        <input 
                            type="button" 
                            onClick={() => window.location.href = `/creartutor`} 
                            value="Agregar Tutor Nuevo" 
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                {lista.map((tutor) => elemento(tutor, setLista))}
            </tbody>
        </table>
    );
}
