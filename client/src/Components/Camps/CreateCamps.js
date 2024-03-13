import { Button, Dialog, DialogBody, DialogHeader, IconButton, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import RegisterCamp from './RegisterCamp';
import MapComponent from '../MapComponent';
import Create_Camp from '../Images/Create_Camp.png';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Footer from '../Footer';
export const CreateCamps = () => {
  const [camp, setCamp] = useState(false);
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [marker, setMarker] = useState(null);
  const [locationAddress, setLocationAddress] = useState("");

  return (
    <div >
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
      <Dialog
        open={camp}
        size='xl'
        handler={(value) => { setCamp(value) }}
        className='h-[90%]'
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className='justify-between'>
          <Typography color="blue-gray" className='ml-2 font-semibold text-xl md:font-extrabold md:text-3xl'>Create Camp</Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => setCamp(false)}
          >
            <XMarkIcon className='h-5 w-5' />
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
      <Footer/>
    </div>
  )
}