import React, { useState } from 'react';
import CampCard from './CampCard';
import { SearchIcon } from '@heroicons/react/outline';
export const CampsList = () => {
  const [query, setQuery] = useState('');
  const [filteredCamps, setFilteredCamps] = useState([]);

  const campsData = [
    {
      location: "Hyderabad",
      description: "NSS Blood Donation Camp",
      startDate: "2024-02-17",
      endDate: "2024-02-18",
      donorsJoined: "4",
      startTime: "09:00",
      endTime: "18:00",
      longitude: "17.64333",
      latitude: "76.666",
      name:"NSS1 Camp"
    },
    {
      location: "Hyderabad",
      description: "NSS Blood Donation Camp",
      startDate: "2024-02-17",
      endDate: "2024-02-18",
      donorsJoined: "4",
      startTime: "09:00",
      endTime: "18:00",
      longitude: "17.64333",
      latitude: "76.666",
      name:"NSS2 Camp"
    },
    {
      location: "Hyderabad",
      description: "Red Cross Blood Donation Camp",
      startDate: "2024-02-17",
      endDate: "2024-02-18",
      donorsJoined: "4",
      startTime: "09:00",
      endTime: "18:00",
      longitude: "17.64333",
      latitude: "76.666",
      name:"Red1 Camp"
    },
    {
      location: "Hyderabad",
      description: "Red Cross Blood Donation Camp",
      startDate: "2024-02-17",
      endDate: "2024-02-18",
      donorsJoined: "4",
      startTime: "09:00",
      endTime: "18:00",
      longitude: "17.64333",
      latitude: "76.666",
      name:"Red2 Camp"
    },
    // Add more camp objects as needed
  ];
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
    console.log(filtered)
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add any form submission logic here
  };
  return (
    <div>
    <form class="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
    <div class="flex">
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Camp</label>
    </div>
    <div class="relative w-full">
    <input type="search" id="search" class="bg-gray-50 border border-gray-500 text-gray-900 text-sm 
    rounded-lg block w-full ps-10 p-2.5" 
    placeholder="Enter Camp Name or Camp ID" required onChange={handleInputChange}/>
    <button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white 
    bg-red-700 rounded-e-lg border">
    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" 
    viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
    <span class="sr-only">Search</span>
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
