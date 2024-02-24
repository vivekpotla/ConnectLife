import React, { useState } from 'react'
import Modal from 'react-modal'
import { RegisterCamp } from './Components/NGO/RegisterCamp';
import MapComponent from './Components/MapComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Header } from './Components/Header';
import { DisplayCamps } from './Components/Camps/DisplayCamps';

// Make sure to bind modal to your app
Modal.setAppElement('#root');

const campData = [
  {
    campId: 1,
    campName: "NCC blood camp",
    description: "sldk kdls lkslkd sl",
    location: "Hyderabad vnr",
    startDate: "15-02-2024",
    endDate: "16-01-2024",
    donorsPerHour: 4
  },
  {
    campId: 2,
    campName: "NCC blood camp",
    description: "sldk kdls lkslkd sl",
    location: "Hyderabad vnr",
    startDate: "15-02-2024",
    endDate: "16-01-2024",
    donorsPerHour: 4
  },
  {
    campId: 3,
    campName: "NCC blood camp",
    description: "sldk kdls lkslkd sl",
    location: "Hyderabad vnr",
    startDate: "15-02-2024",
    endDate: "16-01-2024",
    donorsPerHour: 4
  },
  {
    campId: 4,
    campName: "NCC blood camp",
    description: "sldk kdls lkslkd sl",
    location: "Hyderabad vnr",
    startDate: "15-02-2024",
    endDate: "16-01-2024",
    donorsPerHour: 4
  },
  {
    campId: 5,
    campName: "NCC blood camp",
    description: "sldk kdls lkslkd sl",
    location: "Hyderabad vnr",
    startDate: "15-02-2024",
    endDate: "16-01-2024",
    donorsPerHour: 4
  },
]

function App() {
  const [camps, setCamps] = useState(campData);
  const addData = (data) => {
    setCamps([...camps, data]);
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MapComponent />} />
        <Route path='/camps' element={<DisplayCamps />} />
      </Routes>

      {/* <div className="flex flex-row justify-around my-2">
        <div className="text-lg font-bold" onClick={() => setCamp(true)} >
          Register Camp
        </div>
        <div className="text-lg font-bold">
          Book Slot
        </div>

      </div>
      <MapComponent />
      <div className='flex flex-wrap justify-center'>
        {camps.map((campy) => (
          <div key={campy.campId} className='p-3 w-[300px] border-black border m-2 rounded shadow-md'>
            <div>{campy.campName}</div>
            <div>{campy.description}</div>
            <div>{campy.startDate}</div>
            <div>{campy.endDate}</div>
            <div className='flex justify-end'>
              <div className='bg-red-400 px-2 rounded mt-2 cursor-pointer hover:bg-red-500 hover:shadow-md'>Book Slot</div>
            </div>
          </div>
        ))}
      </div> */}
    </BrowserRouter>
  );
}

export default App;
