import React, { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Routes, Route } from 'react-router-dom';
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
import { DonorFaqs} from './Components/Donor/DonorFaqs.js';
import ContactRequests from './Components/Donor/ContactRequests.js';
import { PreviousCamps } from './Components/NGO/PreviousCamps.js';
import { MyCamps } from './Components/Volunteer/MyCamps.js';
import { UpdateDonorDetails } from './Components/Volunteer/UpdateDonorDetails.js';
import { RecipientFaqs } from './Components/Recipient/RecipientFaqs.js';
import BloodBanks from './Components/BloodBanks.js';
import BloodDonationProcess from './Components/InformationPages/BloodDonationProcess.js';
import BloodProcessing from './Components/InformationPages/BloodProcessing.js';
import { CreateCamps } from './Components/Camps/CreateCamps.js';
import LocationUpdater from './Components/LocationUpdater.js';
import ViewRequests from './Components/Recipient/ViewRequests.js';
import Help from './Components/Profile/Help.js';
import Footer from './Components/Footer.js';
import BloodGroupCompatibility from './Components/InformationPages/BloodGroupCompatibility .js';
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
      <Route path='/bloodprocessing' element={<BloodProcessing />} />
      <Route path='/donationprocess' element={<BloodDonationProcess />} />
    </>
  )

  const NgoRoutes = (
    <>
      <Route path='/ngo' element={<NgoHomePage />} />
      <Route path='/myposts' element={<MyPosts />} />
      <Route path='/mycamps' element={<PreviousCamps />} />
    </>
  )

  const DonorRoutes = (
    <>
      <Route path='/bookappointment' element={<BookAppointment />} />
      <Route path='/receipt' element={<GenerateSlotReciept />} />
      <Route path='/contactrequests' element={<ContactRequests />} />
      <Route path='/donorfaqs' element={<DonorFaqs />} />
    </>
  )
  const VolunteerRoutes = (
    <>
      <Route path='/volunteer/mycamps' element={<MyCamps />} />
      <Route path="/volunteer/donordetails" element={<UpdateDonorDetails />} />
    </>
  )
  const RecipientRoutes = (
    <>
      <Route path='/recipientfaqs' element={<RecipientFaqs />} />
      <Route path='/searchdonors' element={<SearchDonors />} />
      <Route path='/viewrequests' element={<ViewRequests />} />
      <Route path='/bloodbanks' element={<BloodBanks/>}/>
    </>
  )

  return (
  
      <div className="h-dvh overflow-hidden">
        <Header />
        <div className='h-dvh overflow-scroll pb-10'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/camps' element={<CampsList />} />
            <Route path='/campdetails' element={<CampDetails />} />
            <Route path='/activeappointments' element={<ActiveAppoinments />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/help' element={<Help />} />
            <Route path='/bloodbanks' element={<BloodBanks/>}/>
            <Route path='/createcamps' element={<CreateCamps/>}/>
            <Route path='/bloodprocessing' element={<BloodProcessing/>}/>
            <Route path='/donationprocess' element={<BloodDonationProcess/>}/>
            <Route path='/bloodgroupcompatibility' element={<BloodGroupCompatibility/>}/>
            {!isLoggedIn && AuthRoutes}
            {userObj?.userType === "ngo" && NgoRoutes}
            {userObj?.userType === "donor" && DonorRoutes}
            {userObj?.userType === "volunteer" && VolunteerRoutes}
            {userObj?.userType === "recipient" && RecipientRoutes}
          </Routes>
        </div>
        <div className="fixed bottom-0 right-[-10px]">
          <ChatBot />
        </div>
        {userObj && userObj.userType!=='ngo' && <LocationUpdater/>}
        {/* <Footer/> */}
      </div>
     
   
  );
}

export default App;