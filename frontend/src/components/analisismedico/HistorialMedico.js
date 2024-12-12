import React from "react";
import { useState, useEffect } from 'react';
import "./AnalisisMedico.css";
import "../actividad/Actividad.css";
export default function HistorialMedico() {
  const [historial, setHistorial] = useState([]);
  useEffect(() => {
    fetch('http://100.25.250.69/historial/' + window.location.pathname.split("/")[2])
      .then((response) => response.json())
      .then((data) => {
        setHistorial(data);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Temperatura</th>
          <th>Pulso</th>
          <th>Presión</th>
          <th>Observación</th>
        </tr>
      </thead>
      <tbody>
        {historial.map((item) => (
          <tr key={item.id_niño}>
            <td>{item.fecha}</td>
            <td>{item.hora}</td>
            <td>{item.temperatura}</td>
            <td>{item.pulso}</td>
            <td>{item.presion}</td>
            <td>{item.observacion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
