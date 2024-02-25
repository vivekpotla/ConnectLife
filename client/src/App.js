import React from 'react'
import Modal from 'react-modal'
import { RegisterCamp } from './Components/Camps/RegisterCamp';
import MapComponent from './Components/MapComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Header } from './Components/Header';
import {NgoHomePage} from './Components/NGO/NgoHomePage';

// Make sure to bind modal to your app
Modal.setAppElement('#root');

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MapComponent />} />
        <Route path='/ngo' element={<NgoHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
