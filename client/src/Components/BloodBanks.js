import React, { useState, useEffect } from 'react';

function BloodBanks() {
  const [telanganaBloodBanks, setTelanganaBloodBanks] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const BloodBanksData = async () => {
      try {
        const response = await fetch('https://api.data.gov.in/resource/e16c75b6-7ee6-4ade-8e1f-2cd3043ff4c9?api-key=579b464db66ec23bdd0000018212c43d93db4e0148d87744e2c8aa6c&format=json&offset=2375&limit=999');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const telanganaData = data.records.filter(record => record.state === "Telangana");
        setTelanganaBloodBanks(telanganaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

   
    BloodBanksData();
  }, []); 

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Blood Banks in Telangana</h2>
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
