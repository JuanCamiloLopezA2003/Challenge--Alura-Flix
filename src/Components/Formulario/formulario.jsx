import React, { useState, useEffect } from 'react';
import '../Formulario/Formulario.css';
import CampoTexto from './campotexto';
import Listaopciones from './listaopciones';
import Botonguardar from './botonguardar';
import Botonlimpiar from './botonlimpiar';

export default function Formulario({ agregarSerie, generoSerie, serie, editarSerie }) {
  const [titulo, actualizarTitulo] = useState("");
  const [imagen, actualizarImagen] = useState("");
  const [video, actualizarVideo] = useState("");
  const [cartelera, actualizarCartelera] = useState("");
  const [duracion, actualizarDuracion] = useState("");
  const [sinopsis, actualizarSinopsis] = useState("");
  const [genero, actualizarGenero] = useState("");
  const [director, actualizarDirector] = useState("");
  const [actores, actualizarActores] = useState("");

  useEffect(() => {
    if (serie) {
      actualizarTitulo(serie.titulo);
      actualizarImagen(serie.imagen);
      actualizarVideo(serie.video);
      actualizarCartelera(serie.cartelera);
      actualizarSinopsis(serie.sinopsis);
      actualizarGenero(serie.genero);
      actualizarDirector(serie.director);
      actualizarActores(serie.actores);
    }
  }, [serie]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    let datosEnviar = {
      id: serie ? serie.id : null,
      titulo,
      imagen,
      video,
      cartelera,
      sinopsis,
      genero,
      director,
      actores
    };

    if (serie) {
      editarPelicula(datosEnviar);
    } else {
      agregarPelicula(datosEnviar);
      console.log("SERIE AGREGADA", datosEnviar)
      alert("Serie agregada con éxito");
      limpiarFormulario();
    }
  };

  const limpiarFormulario = () => {
    actualizarTitulo("");
    actualizarImagen("");
    actualizarVideo("");
    actualizarCartelera("");
    actualizarSinopsis("");
    actualizarGenero("");
    actualizarDirector("");
    actualizarActores("");
  };

  return (
    <section className='formulario'>
      <div className='titulo-subtitulo'>
        <h1>{serie ? "EDITAR VIDEO" : "NUEVO VIDEO"}</h1>
        <p>{serie ? "ACTUALIZA EL FORMULARIO PARA EDITAR LA TARJETA DE VIDEO" : "COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO"}</p>
      </div>
      <div className='titulo-crearTarjeta'>
        <hr />
        <h1>{serie ? "Editar Tarjeta" : "Crear Tarjeta"}</h1>
        <hr />
      </div>

      <form onSubmit={manejarEnvio}>
        <div className='horizontal-fields'>
          <CampoTexto
            titulo="Titulo"
            placeholder="Titulo del Video"
            required
            valor={titulo}
            actualizarValor={actualizarTitulo}
          />

          <Listaopciones
            titulo="Categoria"
            required
            valor={cartelera}
            actualizarCartelera={actualizarCartelera}
            generoPeli={generoPeli.map(cartelera => cartelera.titulo)}
          />
        </div>

        <div className='horizontal-fields'>
          <CampoTexto
            titulo="Imagen"
            placeholder="Link de la Imagen"
            required
            valor={imagen}
            actualizarValor={actualizarImagen}
          />

          <CampoTexto
            titulo="Video"
            placeholder="Link del Video"
            required
            valor={video}
            actualizarValor={actualizarVideo}
          />
        </div>

        <div className='horizontal-fields'>
          <CampoTexto
            titulo="Sinopsis"
            placeholder="Breve descripción"
            required
            valor={sinopsis}
            actualizarValor={actualizarSinopsis}
          />

          <CampoTexto
            titulo="Género"
            placeholder="Género del Video"
            required
            valor={genero}
            actualizarValor={actualizarGenero}
          />
        </div>

        <div className='horizontal-fields'>
          <CampoTexto
            titulo="Director"
            placeholder="Nombre del Director"
            required
            valor={director}
            actualizarValor={actualizarDirector}
          />

          <CampoTexto
            titulo="Actores"
            placeholder="Nombres de los Actores"
            required
            valor={actores}
            actualizarValor={actualizarActores}
          />
        </div>

        <div className='duracion'>
          <Campoduracion
            titulo="Duracion de la Pelicula"
            required
            valor={duracion}
            actualizarDuracion={actualizarDuracion} />
        </div>

        <div className="button-container">
          <Botonguardar texto="GUARDAR" type="submit" />
          <Botonlimpiar texto="LIMPIAR" onClick={limpiarFormulario} />
        </div>
      </form>
    </section>
  );
}




