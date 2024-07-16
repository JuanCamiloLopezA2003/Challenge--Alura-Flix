import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header/header'
import Home from './Components/Home/home';
import Formulario from './Components/Formulario/formulario';
import FormularioGenero from './Components/Formulario/formulariogen';
import MirarSer from './Components/MirarSer/mirarser';
import Modal from './Components/Modal/modal';
import Page404 from './Components/Page404/page404';
import Footer from './Components/Footer/footer';


function App() {
  const [generoSer, setGeneroSer] = useState([
    {titulo: "CIENCIA FICCION"},
    {titulo: "ANIME"}
  ]);

  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSerie, setCurrentSerie] = useState(null);

  const agregarGenero = (nuevoGenero) =>{
    setGeneroSer([...generoSer, nuevoGenero]);
  };

  const eliminarGenero = (generoAEliminar) =>{
    setGeneroSer(generoSer.filter(genero => genero.titulo !== generoAEliminar));
  };

  const agregarSerie = async (serie) =>{
    try{
      const response = await axios.get ('http://localhost:3000/series');
      const seriesActuales = response.data;

      const ultimoId= seriesActuales.reduce((maxId, serie)=>{
        return serie.id && parseInt (serie.id) > maxId ? parseInt(serie.id): maxId;

      }, 0);

      serie.id= (ultimoId + 1).toString();

      await axios.post('http://localhost:3000/series');

      setSeries([...series, serie]);
      setFilteredSeries([...series, serie]);

    } catch(error){
      console.error("Error al agregar serie:", error);
    }
  };

  const borrarSerie = async(id) =>{
    try{
      await axios.delete(`http://localhost:3000/series/${id}`);
      const updatedSeries = series.filter(ser =>ser.id !==id );
      setSeries(updatedSeries);
      setFilteredSeries(updatedSeries)
    } catch(error){
      console.error("Error al borrar serie:",error);
    }
  };

  const editarSerie = async (serie) =>{
    try{
      const response = await axios.put(`http://localhost:3000/series/${serie.id}`,serie);
      const updatedSeries = series.map(ser = ser.id === serie.id ? response.data : ser);
      setSeries(updatedSeries);
      setFilteredSeries(updatedSeries);

      handleCloseModal();
    } catch (error){
      console.error("Error al editar serie", error);
    }
  }

  const handleOpeneModal = (serie) =>{
    setCurrentSerie(serie);
    setShowModal(true);
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSerie(null);
  };

  const handleSearch = (query) => {
    if(query === ''){
      setFilteredSeries(series);
    } else{
      const filtered = series.filter(serie=>
        serie.titulo.tolowerCase().includes(query.tolowerCase())
      );
      setFilteredSeries(filtered);
    }
  };

  useEffect(()=>{
    const fetchSeries = async ()=>{
      try{
        const response = await axios.get('http://localhost:3000/series');
        setSeries(response.data);
        setFilteredSeries(response.data);
      } catch (error){
        console.error("Error al recuperar series", error);
      }
    };

    fetchSeries();

  }, []);

  return (
    <Router>
      <Header onSeach = {handleSearch} />
      <Routes>
        <Route path="/" element = {<Home generoSer={generoSer} series ={filteredSeries} borrarSerie={borrarSerie} handleOpeneModal={handleOpeneModal} /> } />
        <Route path="/video" element = {< Formulario generoSer={generoSer} agregarSerie={agregarSerie} />} /> 
        <Route path="/genero" element={<FormularioGenero agregarGenero={agregarGenero} eliminarGenero={eliminarGenero} generoSer={generoSer} />} />
        <Route path="mirarser/:id" element={<MirarSer />} />
        <Route path="/404" element= {<Page404/>} />
        <Route path="*" element={<Navigate to="/404"/>} />
      </Routes>

      <Modal>
        <Formulario
        agregarSerie={agregarSerie}
        generoSer={generoSer}
        serie={currentSerie}
        editarSerie={editarSerie}
        />
      </Modal>
      <Footer/>

    </Router>
  );

}

export default App;
