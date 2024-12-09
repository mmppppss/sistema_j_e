import React, { useState, useEffect } from 'react';

function elemento(personal, setLista) {
	const p =personal.permission === 0 ? 'Administrador' : personal.permission === 1 ? 'Profesor' : personal.permission === 2 ? 'Voluntario' : personal.permission ==3 ? "Medico" : 'No definido';
    return (
        <tr key={personal.id}>
            <td>{personal.ci}</td>
            <td>{personal.nombre} {personal.apellido_pat} {personal.apellido_mat}</td>
            <td>{personal.telefono}</td>
            <td>{p}</td>
            <td>
                <input 
                    type="button" 
                    onClick={() => window.location.href = `/actualizarpersonal/${personal.id}`} 
                    value="Editar" 
                />
            </td>
            <td>
                <input 
                    type="button" 
                    value="Eliminar"
                    onClick={() => borrarPersonal(personal.id, setLista)} 
                />
            </td>
        </tr>
    );
}

async function borrarPersonal(id, setLista) {
    const confirmacion = window.confirm("¿Estás seguro de confirmar el eliminado?");
    if (confirmacion) {
        try {
            const response = await fetch(`http://100.25.250.69/personal/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setLista(prevLista => prevLista.filter(personal => personal.id !== id));
                alert('Personal eliminado con éxito');
            } else {
                alert('No se pudo eliminar el personal');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    }
}

export default function ListaPersonal() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        fetch('http://100.25.250.69/personal')
            .then(response => response.json())
            .then(data => setLista(data))
            .catch(error => console.error('Error al cargar la lista de personal:', error));
    }, []);

    return (
        <table className="lista-personal-table">
            <thead>
                <tr className="titulos">
                    <th>CI</th>
                    <th>Nombre Completo</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th></th>
                    <th>
                        <input 
                            type="button" 
                            onClick={() => window.location.href = `/crearpersonal`} 
                            value="Agregar Nuevo Personal" 
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                {lista.map((personal) => elemento(personal, setLista))}
            </tbody>
        </table>
    );
}
