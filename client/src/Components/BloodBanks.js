import React, { useState, useEffect } from 'react';

function BloodBanks() {
  const [telanganaBloodBanks, setTelanganaBloodBanks] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const [userLocation, setUserLocation] = useState({
    latitude: 17.454242,
    longitude: 78.393940
  });

  useEffect(() => {
    
    const BloodBanksData = async () => {
      try {
        const response = await fetch('https://api.data.gov.in/resource/e16c75b6-7ee6-4ade-8e1f-2cd3043ff4c9?api-key=579b464db66ec23bdd0000018212c43d93db4e0148d87744e2c8aa6c&format=json&offset=2375&limit=999');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const telanganaData = data.records.filter(record => record.state === "Telangana");
       

        const filteredBloodBanks =telanganaData.filter(record => {
          if (!searchDistrict) {
            return true; 
          } else {
            return record.district.toLowerCase() === searchDistrict.toLowerCase(); 
          }
        });
        if(!searchDistrict)
        {filteredBloodBanks = filteredBloodBanks.filter(record => {
          const distance = calculateDistance(userLocation.latitude, userLocation.longitude, record.latitude, record.longitude);
          console.log(distance);
          return distance <= 20; 
        });
        }
        const sortedBloodBanks = filteredBloodBanks.sort((a, b) => {
          const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
          const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
          return distanceA - distanceB;
        });
        setTelanganaBloodBanks(sortedBloodBanks);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    BloodBanksData();
  }, [searchDistrict]); 
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

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Blood Banks in Telangana</h2>
      <div className="mb-4">
        <label htmlFor="districtSearch" className="block text-sm font-medium text-gray-700">Search by District:</label>
        <input
          type="text"
          id="districtSearch"
          name="districtSearch"
          value={searchDistrict}
          onChange={handleSearch}
          placeholder="Enter district name"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">District</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {telanganaBloodBanks.map((bank, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border px-4 py-2">{bank.h_name}</td>
              <td className="border px-4 py-2">{bank.district}</td>
              <td className="border px-4 py-2">{bank.address}</td>
              <td className="border px-4 py-2">{bank.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BloodBanks;
