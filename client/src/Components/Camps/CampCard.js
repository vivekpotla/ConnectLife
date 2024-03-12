import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react'
import { MapPinIcon } from '@heroicons/react/24/solid'

export default function CampCard({ camps }) {

  const startDate = new Date(camps.startDate);
  const endDate = new Date(camps.endDate);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 m-5 transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300">
      <a href={camps.link} className='flex justify-center items-center m-4'>
        <img className="rounded-lg shadow-md" src={camps.imageURL} alt="camps image" />
      </a>
      <div className="px-5 pb-5">
        <div className="flex items-center">
          {/* {React.createElement(BuildingStorefrontIcon, { className: "h-[18px] w-[18px]" })}{" "} */}
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{camps.name}</h5>
        </div>
        <div className='text-gray-600'>{camps.description}</div>
        <div className="flex items-start gap-2 py-3">
          <div>
            <MapPinIcon className="w-5 text-blue-gray-500 mt-0.5 fill-red-300" />
          </div>
          <span className="text-l text-gray-700 dark:text-white line-clamp-2">{camps.location}</span>
        </div>
        <p className="text-l text-gray-700 dark:text-white ">Start Date : {startDate.toDateString()}</p>
        <p className="text-l text-gray-700 dark:text-white">End Date : {endDate.toDateString()}</p>
        <p className="text-l text-gray-700 dark:text-white pb-5">Timings : {camps.startTime.slice(0, 5)} AM to {camps.endTime.slice(0, 5)} PM</p>
        <p className="text-sm text-gray-600 dark:text-white pb-3">{camps.donorsJoined} Donors have Joined us already!</p>
        <Link to="/campdetails" state={{ camps }} >
        <Button size="md" variant="gradient" color='red' className="select-none rounded-lg block w-1/2">
            View Camp Details
        </Button>
          </Link>
      </div>
    </div>
  );
}
