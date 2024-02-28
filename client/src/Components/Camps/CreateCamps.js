import { Button, Dialog, DialogBody, DialogHeader, IconButton, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import RegisterCamp from './RegisterCamp';
import ReactModal from 'react-modal';
import MapComponent from '../MapComponent';
import Create_Camp from '../Images/Create_Camp.png'
export const CreateCamps = () => {
  const [camp, setCamp] = useState(false);
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [marker, setMarker] = useState(null);
  const [locationAddress, setLocationAddress] = useState("");

  return (
    <div >
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img src={Create_Camp} alt='CampImage'></img>
        <Button size="md" variant="gradient" color='red'
          className="select-none rounded-lg block w-full hover:scale-105 focus:scale-105 active:scale-100" onClick={() => {
            if (userObj == null || userObj.userType !== "ngo") {
              navigate("/login/NGO");
            } else {
              setCamp(true);
            }
          }}>
          Create Camp
        </Button>
      </div>
      {/* <ReactModal
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
      </ReactModal> */}
      <Dialog open={camp} size='xl' handler={(value) => { setCamp(value) }} className='h-[90%]'>
        <DialogHeader className='justify-between'>
          <Typography color="blue-gray" className='ml-2 font-semibold text-xl md:font-extrabold md:text-3xl'>Create Camp</Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => setCamp(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='mx-1 overflow-scroll max-h-[76vh] overflow-x-hidden lg:overflow-hidden'>
          <div className='lg:flex gap-5 justify-between'>
            <div className='w-full mb-5 lg:mb-0'>
              <MapComponent setMarker={(value) => setMarker(value)} setLocationAddress={(value) => setLocationAddress(value)} />
            </div>
            <div className='lg:overflow-scroll lg:overflow-x-hidden lg:max-h-[72vh] lg:min-w-[34vw]'>
              <RegisterCamp marker={marker} setLocationAddress={(value) => setLocationAddress(value)} locationAddress={locationAddress} ngoId={userObj._id} />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  )
}