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
import HomePage from './Components/Home/HomePage.js';
import Login from './Components/SignUp/Login.js';
import { useSelector } from 'react-redux';
import ChatBot from './Components/ChatBot/ChatBot.js';
// Make sure to bind modal to your app
Modal.setAppElement('#root');

function App() {

  const [userObj, setUserObj] = useState(null);
  let isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    setUserObj(JSON.parse(localStorage.getItem("user")));
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
      <div className="">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/camps' element={<CampsList />} />
          <Route path='/campdetails' element={<CampDetails />} />
          <Route path='/activeappointments' element={<ActiveAppoinments />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/searchdonors' element={<SearchDonors />} />
          {!isLoggedIn && AuthRoutes}
          {userObj?.userType === "ngo" && NgoRoutes}
          {userObj?.userType === "donor" && DonorRoutes}
        </Routes>
        <div className="fixed bottom-0 right-[-10px]">
          <ChatBot />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
