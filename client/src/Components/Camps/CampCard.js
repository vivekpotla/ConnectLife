import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react'
import Nss_logo from '../Images/Nss_logo.png'
import BuildingStorefrontIcon from "@material-tailwind/react";
export default function CampCard({camps}) {
    console.log(camps);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5 transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300">
    <a href={camps.link} className='flex justify-center items-center'>
      <img className="p-8 rounded-t-lg" src={Nss_logo} alt="camps image" />
    </a>
    <div className="px-5 pb-5">
        <div className="flex items-center mb-2">
        {/* {React.createElement(BuildingStorefrontIcon, { className: "h-[18px] w-[18px]" })}{" "} */}
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{camps.description}</h5>
        </div>
        <div className="flex items-center mb-2">
            <svg className="w-6 h-6 fill-current text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-l text-gray-900 dark:text-white">{camps.location}</span>
        </div>
        <p className="text-l text-gray-900 dark:text-white pt-5">Start Date : {camps.startDate}</p>
        <p className="text-l text-gray-900 dark:text-white">End Date : {camps.endDate}</p>
        <p className="text-l text-gray-900 dark:text-white pb-5">Timings : {camps.startTime}AM to {camps.endTime}PM</p>
        <p className="text-sm text-gray-600 dark:text-white pb-3">{camps.donorsJoined} Donors have Joined us already!</p>
        <Button size="md" variant="gradient" color='red' className="select-none rounded-lg block w-1/2">
        <Link
          to={{
            pathname: "/campdetails",
            state: { campData: camps }
          }}
        >
          View Camp Details
        </Link>
        </Button>
    </div>
  </div>
);
}
