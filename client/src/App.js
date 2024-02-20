import React, { useState } from 'react'
import Modal from 'react-modal'
import { RegisterCamp } from './RegisterCampPage/RegisterCamp';
import MapComponent from './Components/MapComponent';
import 'leaflet/dist/leaflet.css';
import { Header } from './Components/Header';

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

  const [camp, setCamp] = useState(false);
  const [camps, setCamps] = useState(campData);
  const addData = (data) => {
    setCamps([...camps, data]);
    setCamp(false);
  }

  return (
    <div className="">
      <Header />
      {/* <div className="flex flex-row justify-around my-2">
        <div className="text-lg font-bold" onClick={() => setCamp(true)} >
          Register Camp
        </div>
        <div className="text-lg font-bold">
          Book Slot
        </div>
        <Modal
          isOpen={camp}
          onRequestClose={() => setCamp(false)}
          contentLabel='Register Camp'
        >
          <div className="flex justify-end fixed end-16">
            <button onClick={() => setCamp(false)} className="bg-transparent border-none text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <RegisterCamp addData={addData} />
        </Modal>
      </div> */}
      {/* <MapComponent /> */}
      {/* <div className='flex flex-wrap justify-center'>
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
    </div>
  );
}

export default App;
