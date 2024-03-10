import React, { useState, useEffect } from 'react';
import axios from 'axios';
const donorsData = [
  { id: 1, name: 'John Doe', bloodGroup: 'A+', latitude: 17.1030, longitude: 76.39 },
  { id: 2, name: 'Jane Smith', bloodGroup: 'B-', latitude: 17.1, longitude: 76.36 },
  { id: 3, name: 'Alice Johnson', bloodGroup: 'O+', latitude: 17.105, longitude: 76.38 },
  { id: 4, name: 'Bob Williams', bloodGroup: 'AB+', latitude: 17.1, longitude: 76.35 },
  // Add more donor data as needed
];

const SearchDonors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedDonor, setRequestedDonor] = useState(null);
  const [nearestDonors, setNearestDonors] = useState([]);
  const [donorData,setDonorData]=useState('');
  const [recipentData,setRecipientData]=useState({
    recipientLatitude:0,
    recipientLongitude:0,
    recipientBloodGroup:'A+'
  })
  // // Recipient's details
  // const recipientLatitude = 17.1010;
  // const recipientLongitude = 76.37;
  // const recipientBloodGroup = 'A+'; // Default blood group
   // Function to retrieve recipient details from local storage
   const getRecipentDetailsFromLocalStorage = () => {
    const recipentDetails = JSON.parse(localStorage.getItem('user'));
    return recipentDetails || {};
  };
   

  

  useEffect(() => {
    // Get recipent details from local storage
    const recipient = getRecipentDetailsFromLocalStorage();
   
    
    setRecipientData({
      recipientLatitude: recipient.livelocation.latitude,
      recipientLongitude: recipient.livelocation.longitude,
      recipientBloodGroup: recipient.bloodGroup
    });
    // const getDonorsData=async ()=>{
    //   const donorList= await axios.post(`http://localhost:5000/api/recipient/get-nearest-donors`,{
    //     recipientLatitude: recipentData.recipientLatitude,
    //     recipientLongitude: recipentData.recipientLongitude,
    //     bloodType: recipentData.recipientBloodGroup
    //   })
    //   console.log(donorList.data);
    // }
    const getDonorsData = async () => {
      try {
        const donorList = await axios.post(`http://localhost:5000/api/recipient/get-nearest-donors`, {
          recipientLatitude: recipentData.recipientLatitude,
          recipientLongitude: recipentData.recipientLongitude,
          bloodType: recipentData.recipientBloodGroup
        });
        console.log(donorList.status); // Log the status code
        console.log(donorList.headers); // Log the response headers
        console.log(donorList.data); // Log the response data
      } catch (error) {
        console.error(error);
      }
    }
    getDonorsData();
    // Calculate distances and prioritize by blood group
    const donorsWithDistances = donorsData.map(donor => {
      const distance = getDistance(recipentData.recipientLatitude, recipentData.recipientLongitude, donor.latitude, donor.longitude);
      return { ...donor, distance };
    },[]);

    // Sort donors by blood group and then by distance
    const sortedDonors = donorsWithDistances.sort((a, b) => {
      if (a.bloodGroup === recipentData.recipientBloodGroup) {
        if (b.bloodGroup === recipentData.recipientBloodGroup) {
          return a.distance - b.distance;
        }
        return -1;
      }
      if (b.bloodGroup === recipentData.recipientBloodGroup) {
        return 1;
      }
      // Add more conditions for other blood groups as needed
      return a.distance - b.distance;
    });

    setNearestDonors(sortedDonors);
  }, [recipentData.recipientLatitude, recipentData.recipientLongitude, recipentData.recipientBloodGroup]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRequestBlood = (donor) => {
    setRequestedDonor(donor);
  console.log(donor);
  // You can send request for blood donation here (e.g., API call)
  axios.post('http://localhost:5000/api/donor/view-recipient-requests', donor.id)
    .then(response => {
      console.log('Request sent successfully:', response.data);
      setTimeout(() => {
        setRequestedDonor(null);
      }, 5000);
    })
    .catch(error => {
      // Handle errors
      console.error('Error sending request:', error);
     
    })
    .finally(() => {
     
    
    });
  }
  const filteredDonors = nearestDonors.filter(donor =>
    donor.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-10">
      <div>
    <form class="max-w-md mx-auto mt-4" onSubmit={handleSearch}>
    <div class="flex">
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">donor</label>
    </div>
    <div class="relative w-full">
    <input type="search" id="search" class="border border-gray-500 text-gray-900 text-sm 
    rounded-lg block w-full p-2.5" 
    placeholder="Enter Blood Group" required onChange={handleSearch}/>
    <button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white 
    bg-red-700 rounded-e-lg border border-gray-500">
    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" 
    viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
    <span class="sr-only">Search</span>
    </button>
    </div>
  </form>
  </div>
  <div className='mt-4'>
  <table className="w-full">
    <thead className="font-bold bg-gray-100">
      <tr>
        <th className="w-1/3 border py-2">Name</th>
        <th className="w-1/3 border py-2">Blood Group</th>
        <th className="w-1/3 border py-2">Request</th>
      </tr>
    </thead>
    <tbody>
      {filteredDonors.map(donor => (
        <tr key={donor.id} className="border-b border-gray-900 text-center">
          <td className="w-1/3 border py-2">{donor.name}</td>
          <td className="w-1/3 border py-2">{donor.bloodGroup}</td>
          <td className="w-1/3 border py-2">
            <button
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={() => handleRequestBlood(donor)}
            >
              Request Contact
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {requestedDonor && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4" role="alert">
      <strong className="font-bold">Request sent!</strong>
      <span className="block sm:inline"> Your request has been sent to {requestedDonor.name}.</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setRequestedDonor(null)}>
        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path fillRule="evenodd" d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.435a1 1 0 1 1-1.236-1.562L8.768 10 5.835 7.07a1 1 0 0 1 1.236-1.562L10 8.586l2.93-2.436a1 1 0 1 1 1.236 1.562L11.232 10l2.116 2.849a1 1 0 0 1 0 1.414z" clipRule="evenodd"/>
        </svg>
      </span>
    </div>
  )}
</div>
    </div>
  );
};

// Function to calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default SearchDonors;
