import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { RegisterCamp } from '../NGO/RegisterCamp';
import ReactModal from 'react-modal';

export const DisplayCamps = () => {
  const [camp, setCamp] = useState(false);
  const navigate = useNavigate();
  const addData = () => {
    setCamp(false);
  }
  return (
    <div className=''>
      <Button size="md" variant="gradient" color='red' className="text-sm" onClick={() => setCamp(true)}>
        Create Camp
      </Button>
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
        <div className='flex justify-evenly mt-4'>
          <div className=''>
            image
          </div>
          <RegisterCamp addData={addData} />
        </div>
      </ReactModal>
    </div>
  )
}
