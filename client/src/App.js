import React from 'react'
import Modal from 'react-modal'
import MapComponent from './Components/MapComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Header } from './Components/Header';
import { DisplayCamps } from './Components/Camps/DisplayCamps';
import Registration from './Components/SignUp/Registration';

// Make sure to bind modal to your app
Modal.setAppElement('#root');

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MapComponent />} />
        <Route path='/camps' element={<DisplayCamps />} />
        <Route path='/SignUp/:userType' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
