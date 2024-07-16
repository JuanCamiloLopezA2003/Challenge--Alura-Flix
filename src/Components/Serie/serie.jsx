import React from 'react';
import './Serie.css';
import editar from '/img/editar.png';
import eliminar from '/img/eliminar.png';
import { FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Serie({ datos, onBorrar, onEdit }) {
  const { id, titulo, imagen } = datos;

  const manejarBorrado = () => {
    onBorrar(id);
  };

  const manejarEdicion = () => {
    onEdit(datos);
  };

  const truncarTexto = (texto, longitudMaxima) => {
    return texto.length > longitudMaxima ? texto.slice(0, longitudMaxima) + '...' : texto;
  };

  return (
    <div className='serie'>
      <div className='encabezado'>
        <Link to={`/mirarser/${id}`}>
          <img className='imagen-ser' src={imagen} alt={titulo} />
        </Link>
        <div className='info-ser'>
          <h4>{truncarTexto(titulo, 18)}</h4>
          <p><FaRegClock /> {duracion}</p>
        </div>
        <div className='iconos'>
          <div className='ciencia' onClick={manejarBorrado}>
            <img src={eliminar} alt="eliminar" />
            <p>BORRAR</p>
          </div>
          <div className='ciencia' onClick={manejarEdicion}>
            <img src={editar} alt="editar" />
            <p>EDITAR</p>
          </div>
        </div>
      </div>
    </div>
  );
}