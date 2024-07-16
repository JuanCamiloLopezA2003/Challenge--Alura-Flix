import React from "react";
import './cartelera.css'
import Serie from '../Serie/serie'; 


export default function Cartelera({datos, series, onBorrar, onEdit}){
    const  { titulo}  = datos;
    const seriesFiltradas = series.filter(serie => serie.cartelera === titulo)

    return(
        <div>
        <div className='cartelera'>
            <h3 className='titulo-genero'>{titulo}</h3>
        </div>
        <div className='series-container'>
            <div className='ser'>
                {seriesFiltradas.map((serie, index) => (
                <Serie
                    key={index}
                    datos={serie}
                    onBorrar={() => onBorrar(serie.id)}
                    onEdit={onEdit}
                />
                ))}
            </div>
      </div>
    </div>
); 
}





