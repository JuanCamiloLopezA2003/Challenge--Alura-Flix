import React from "react";
import Cartelera from '../Cartelera/cartelera'
import './home.css';

export default function Home({ generoSER, series, borrarSerie, handleOpenModal }) {
    return (
      <section className="home-section">
        {peliculas.length === 0 ? (
          <div className="no-results-message">
            No se encontraron series que coincidan con la búsqueda.
          </div>
        ) : (
          <>
            {generoPeli.map((cartelera, index) => (
              <Cartelera key={index} datos={cartelera} series={series} onBorrar={borrarSerie} onEdit={handleOpenModal} />
            ))}
          </>
        )}
  
        <hr className="linea" />
        <div className="leyenda">Fin del Contenido</div>
        <hr className="linea" />
      </section>
    );
  }