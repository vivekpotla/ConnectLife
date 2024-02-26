import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { RegisterCamp } from './RegisterCamp';
import ReactModal from 'react-modal';
import MapComponent from '../MapComponent';
import Create_Camp from '../Images/Create_Camp.png'
export const CreateCamps = () => {
  const [camp, setCamp] = useState(false);
  const navigate = useNavigate();
  const addData = () => {
    setCamp(false);
  }
  return (
    <div >
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img src={Create_Camp}></img>
        <Button size="md" variant="gradient" color='red'
          className="select-none rounded-lg block w-full hover:scale-105 focus:scale-105 active:scale-100" onClick={() => setCamp(true)}>
          Create Camp
        </Button>
      </div>
      <ReactModal
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
        <div className='flex flex-col-reverse md:flex-row justify-evenly mt-4'>
          <div className=''>
            <MapComponent />
          </div>
          <RegisterCamp addData={addData} />
        </div>
      </ReactModal>
    </div>
  )
}