import React, { useState } from 'react'
import Modal from 'react-modal'
import { RegisterCamp } from './RegisterCampPage/RegisterCamp';
import MapComponent from './Components/MapComponent';
import 'leaflet/dist/leaflet.css';

// Make sure to bind modal to your app
Modal.setAppElement('#root');

function App() {

  const [camp, setCamp] = useState(false);

  return (
    <div className="">
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
          <RegisterCamp />
        </Modal>
      </div> */}
      <MapComponent />
    </div>
  );
}

export default App;
