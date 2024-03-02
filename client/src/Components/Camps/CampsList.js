import React, { useEffect, useState } from 'react';
import CampCard from './CampCard';
import axios from 'axios';


export const CampsList = () => {
  const [query, setQuery] = useState('');
  const [filteredCamps, setFilteredCamps] = useState([]);

  const [campsData, setCampsData] = useState([]);

  useEffect(() => {
    const getCampsData = async () => {
      try {
        // Get latitude and longitude using browser geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Make API call with latitude and longitude

          await axios.post('http://localhost:5000/api/donor/nearestcamps', {
            latitude,
            longitude
          }).then((res) => {
            setCampsData(res.data);
          }).catch((error) => {
            console.log(error);
          });
        });
      } catch (error) {
        console.error('Error fetching camps data:', error);
      }
    };

    getCampsData();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase().trim(); // Trim any leading or trailing whitespace
    console.log(inputValue);
    setQuery(inputValue);
    const filtered = campsData.filter(camp => {
      const indexOfBlood = camp.name.toLowerCase().indexOf('blood');
      const campNameUntilBlood = indexOfBlood !== -1 ? camp.name.toLowerCase().substring(0, indexOfBlood).trim() : camp.name.toLowerCase().trim();
      return campNameUntilBlood.startsWith(inputValue);
    });
    setFilteredCamps(filtered);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add any form submission logic here
  };
  return (
    <div className='bg-gray-100 max-h-full p-1 h-screen'>
      <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Camp</label>
        </div>
        <div className="relative w-full">
          <input type="search" id="search" className="bg-gray-50 border border-gray-500 text-gray-900 text-sm 
    rounded-lg block w-full ps-10 p-2.5"
            placeholder="Enter Camp Name or Camp ID" required onChange={handleInputChange} />
          <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white 
    bg-red-700 rounded-e-lg border border-gray-500">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
      <div className="flex flex-wrap justify-center gap-2">
        {query ? filteredCamps.map((camp, index) => (
          <CampCard key={index} camps={camp} />
        )) : campsData.map((camp, index) => (
          <CampCard key={index} camps={camp} />
        ))}
      </div>
    </div>
  );
}
