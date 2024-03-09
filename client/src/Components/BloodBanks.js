import React, { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom'
import { Button, Input, Typography, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';


function BloodBanks() {
  const [telanganaBloodBanks, setTelanganaBloodBanks] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState('');
  const [sortBy, setSortBy] = useState('distance'); // Default sorting by distance
  //const [query, setQuery] = useState('');
  const userLocation = {
    latitude: 17.454242,
    longitude: 78.393940
  };

  useEffect(() => {
    const BloodBanksData = async () => {
      try {
        const response = await fetch('https://api.data.gov.in/resource/e16c75b6-7ee6-4ade-8e1f-2cd3043ff4c9?api-key=579b464db66ec23bdd0000018212c43d93db4e0148d87744e2c8aa6c&format=json&offset=2375&limit=999');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const telanganaData = data.records.filter(record => record.state === "Telangana");

        let filteredBloodBanks = telanganaData.filter(record => {
          if (!searchDistrict) {
            return true;
          } else {
            return record.district.toLowerCase() === searchDistrict.toLowerCase();
          }
        });

        if (!searchDistrict) {
          filteredBloodBanks = filteredBloodBanks.filter(record => {
            const distance = calculateDistance(userLocation.latitude, userLocation.longitude, record.latitude, record.longitude);
            return distance <= 20;
          });
        }

        let sortedBloodBanks;
        if (sortBy === 'distance') {
          sortedBloodBanks = filteredBloodBanks.sort((a, b) => {
            const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
            const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
            return distanceA - distanceB;
          });
        } else if (sortBy === 'name') {
          sortedBloodBanks = filteredBloodBanks.sort((a, b) => {
            return a.h_name.localeCompare(b.h_name);
          });
        }

        setTelanganaBloodBanks(sortedBloodBanks);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    BloodBanksData();
  }, [searchDistrict, sortBy]); // Trigger the effect when searchDistrict or sortBy changes

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const radLat1 = degreesToRadians(lat1);
    const radLat2 = degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) *
      Math.cos(radLat1) * Math.cos(radLat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  };

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const handleSearch = (event) => {
    setSearchDistrict(event.target.value);
  };

  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);
  };

  return (
    <div className="mx-auto">
    <div className='bg-gray-100'>
      <h2 className="text-xl font-bold mb-4 pt-2 text-gray-700 text-center">Blood Banks in Telangana</h2>
      <div className="md:flex-row flex-col flex md:mr-5 mr-2 mt-3 justify-center">
        <div className='relative flex md:mt-0 mt-3 mb-3'>
          <div className="relative inline-block rounded-md">
            <div className="flex  bg-gray-100 p-1 rounded-md items-center">
              <AdjustmentsHorizontalIcon  className="h-[18px] w-[18px] text-blue-gray-500 mr-1"  />
              <Menu >
                <MenuHandler>
                  <Link size="sm" className="bg-gray-100  text-black-500 flex items-center">
                    {sortBy === 'distance' ? 'Distance' : 'Name'}
                    <ChevronDownIcon className="h-4 w-4 ml-1"  strokeWidth={2}/>
                  </Link>

                </MenuHandler>
                <MenuList className="absolute left-0 z-50 mt-2 py-1">
                  <MenuItem onClick={() => handleSortChange('distance')} className="block px-4 py-2 hover:bg-blue-gray-100 cursor-pointer">
                    <Typography variant="h6" color="blue-gray" className="">
                      Nearest
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                     Sort by distance
                    </Typography></MenuItem>
                  <MenuItem onClick={() => handleSortChange('name')} className="block px-4 py-2 hover:bg-blue-gray-100 cursor-pointer">
                    <Typography variant="h6" color="blue-gray" className="">
                      Name
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Sort by name
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <Input
            type="text"
            id="districtSearch"
            name="districtSearch"
            value={searchDistrict}
            onChange={handleSearch}
            placeholder="Enter district name"
            className="!border !border-gray-300 pr-14 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-2 ring-transparent focus:ring-gray-900/10 ms-3"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "max-w-[300px] min-w-[100px]" }}
          />
          <Button
            size="sm"
            type="submit"
            className="!absolute right-1 top-1 rounded bg-red-900 px-3 py-1.5">
            <MagnifyingGlassIcon className='h-5 w-5 ' />
          </Button>
        </div>
      </div>

</div>






<div className='container mx-auto mb-10 '>

      <table className="table-auto w-full mt-3 border border-black-100">
        <thead className='bg-gray-100'>
          <tr >
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">District</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {telanganaBloodBanks.map((bank, index) => (
            <tr key={index} className={index % 2 !== 0 ? 'bg-gray-100 hover:bg-blue-gray-100' : 'bg-white hover:bg-blue-gray-100' }>
              <td className="border px-4 py-2">{bank.h_name}</td>
              <td className="border px-4 py-2">{bank.district}</td>
              <td className="border px-4 py-2">{bank.address}</td>
              <td className="border px-4 py-2">{bank.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default BloodBanks;
