import React, { useState, useEffect } from "react";
import "../actividad/Actividad.css";

function elementoMateria(materia, setLista, session) {
  function x(){if(session.permission == 0){
    return(<><td>
            <input
              type="button"
              value="Editar"
              onClick={() => {
                window.location.href = `/actualizarmateria/${materia.id}`;
              } } />
          </td><td>
              <input
                type="button"
                value="Eliminar"
                onClick={() => borrarMateria(materia.id, setLista)} />
            </td></>)
          }
        }
  return (
    <tr>
      <td>{materia.nombre}</td>
      <td>{materia.id_profesor}</td>
      <td>{materia.id_voluntario}</td>
      <td>{materia.descripcion}</td>
      <td>{materia.fecha}</td>
      <td>{materia.hora}</td>
      {x()}
    </tr>
  );
}

async function borrarMateria(id, setLista) {
  const confirmacion = window.confirm(
    "¿Estás seguro de confirmar la eliminación?"
  );
  if (confirmacion) {
    try {
      const response = await fetch(`http://100.25.250.69/materia/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLista((prevLista) => prevLista.filter((materia) => materia.id !== id));
        alert("Materia eliminada con éxito");
      } else {
        alert("No se pudo eliminar la materia");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  }
}

export default function ListaMaterias(props) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch("http://100.25.250.69/materia")
      .then((response) => response.json())
      .then((data) => {
        setLista(data);
      });
  }, []);
  function a(){
    if(props.session.permission == 0){
    return (<th>
      <input
        type="button"
        onClick={() => {
          window.location.href = `/crearmateria`;
        }}
        value="Agregar Materia Nueva"
      />
      </th>)
    }}
  return (
    <table>
      <tr className="titulos">
        <th>Nombre</th>
        <th>Profesor</th>
        <th>Voluntario</th>
        <th>Descripción</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th></th>
        { a() }
      </tr>
      {lista.length > 0 ? (
        lista.map((materia) => elementoMateria(materia, setLista, props.session))
      ) : (
        <tr>
          <td colSpan="8">No hay materias disponibles</td>
        </tr>
      )}
    </table>
  );
}
