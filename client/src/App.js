import React from 'react'
import Modal from 'react-modal'
import MapComponent from './Components/MapComponent';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Header } from './Components/Header';
import { NgoHomePage } from './Components/NGO/NgoHomePage';
import { CampsList } from './Components/Camps/CampsList.js';
import { CampDetails } from './Components/Camps/CampDetails.js';
import ActiveAppoinments from './Components/Donor/ActiveAppointments.js'
import EditProfile from './Components/Donor/EditProfile.js';
import Registration from './Components/SignUp/Registration.js';
import { BookAppointment } from './Components/Donor/BookAppointment.js';
import { GenerateSlotReciept } from './Components/Donor/GenerateSlotReciept.js';
import MyPosts from './Components/NGO/MyPosts.js';
import SearchDonors from './Components/Recipient/SearchDonors.js';
import HomePage from './Components/HomePage.js';
import Login from './Components/SignUp/Login.js';
// Make sure to bind modal to your app
Modal.setAppElement('#root');

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/map' element={<MapComponent />} />
        <Route path='/ngo' element={<NgoHomePage />} />
        <Route path='/camps' element={<CampsList />} />
        <Route path='/campdetails' element={<CampDetails />} />
        <Route path='/activeappointments' element={<ActiveAppoinments />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/bookappointment' element={<BookAppointment />} />
        <Route path='/receipt' element={<GenerateSlotReciept />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/searchdonors' element={<SearchDonors />} />
        <Route path='/myposts' element={<MyPosts />} />
        <Route path='/SignUp/:userType' element={<Registration />} />
        <Route path='/login/:userType' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
