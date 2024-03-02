import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { NgoHomePage } from './Components/NGO/NgoHomePage';
import { CampsList } from './Components/Camps/CampsList.js';
import { CampDetails } from './Components/Camps/CampDetails.js';
import ActiveAppoinments from './Components/Donor/ActiveAppointments.js'
import EditProfile from './Components/Profile/EditProfile.js';
import Registration from './Components/SignUp/Registration.js';
import { BookAppointment } from './Components/Donor/BookAppointment.js';
import { GenerateSlotReciept } from './Components/Donor/GenerateSlotReciept.js';
import MyPosts from './Components/NGO/MyPosts.js';
import SearchDonors from './Components/Recipient/SearchDonors.js';
import HomePage from './Components/HomePage.js';
import Login from './Components/SignUp/Login.js';
import { useSelector } from 'react-redux';
// Make sure to bind modal to your app
Modal.setAppElement('#root');

function App() {

  const [userObj, setUserObj] = useState(null);
  let isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    setUserObj(JSON.parse(localStorage.getItem("user")));
    console.log(localStorage.getItem("user"));
  }, [isLoggedIn]);


  const AuthRoutes = (
    <>
      <Route path='/SignUp/:userType' element={<Registration />} />
      <Route path='/login/:userType' element={<Login />} />
    </>
  )

  const NgoRoutes = (
    <>
      <Route path='/ngo' element={<NgoHomePage />} />
      <Route path='/myposts' element={<MyPosts />} />
    </>
  )

  const DonorRoutes = (
    <>
      <Route path='/bookappointment' element={<BookAppointment />} />
      <Route path='/receipt' element={<GenerateSlotReciept />} />
    </>
  )

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/camps' element={<CampsList />} />
        <Route path='/campdetails' element={<CampDetails />} />
        <Route path='/activeappointments' element={<ActiveAppoinments />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/searchdonors' element={<SearchDonors />} />
        {!userObj && AuthRoutes}
        {userObj?.userType === "ngo" && NgoRoutes}
        {userObj?.userType === "donor" && DonorRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
