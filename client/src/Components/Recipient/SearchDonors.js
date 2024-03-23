import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
let donorsData=[]
const SearchDonors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedDonor, setRequestedDonor] = useState("");
  const [nearestDonors, setNearestDonors] = useState([]);
  const [recipientData,setRecipientData]=useState({})
  const [userLatitude,setUserLatitude]= useState(0)
  const [userLongitude,setUserLongitude]= useState(0)
  const [errorMsg, setErrorMsg] =useState("")
  const [requestedDonorName, setRequestedDonorName] = useState('');
  const [loading, setLoading] = useState(false);

  //getting browser location
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setUserLatitude(latitude)
      setUserLongitude(longitude)
    });
  } 
  else 
  {
      console.error('Geolocation is not supported by this browser.');
  }

  const getRecipentDetailsFromLocalStorage = () => 
    {
    const recipentDetails = JSON.parse(localStorage.getItem('user'));
    return recipentDetails || {};
  };

  useEffect(() => {
    // Get recipent details from local storage
    const recipient = getRecipentDetailsFromLocalStorage();
    setRecipientData({
      recipientLatitude: userLatitude,
      recipientLongitude: userLongitude,
      recipientBloodGroup: recipient.bloodGroup,
      _id :recipient._id
    });
    const getDonorsData = async () => {
        try {
          setLoading(true)
          const donorList = await axios.post(`http://localhost:5000/api/recipient/get-nearest-donors`, {
            recipientLatitude: userLatitude,
            recipientLongitude: userLongitude,
            bloodType: recipient.bloodGroup
          });
          setLoading(false)
          console.log(donorList.data); 
          setNearestDonors(donorList.data);
        } catch (error) {
          console.error(error);
      }
    }
    getDonorsData();
    // Calculate distances and prioritize by blood group
    const donorsWithDistances = donorsData.map(donor => {
      const distance = getDistance(recipientData.recipientLatitude, recipientData.recipientLongitude, donor.latitude, donor.longitude);
      return { ...donor, distance };
    },[]);

    // Sort donors by blood group and then by distance
    const sortedDonors = donorsWithDistances.sort((a, b) => {
      if (a.bloodGroup === recipientData.recipientBloodGroup) {
        if (b.bloodGroup === recipientData.recipientBloodGroup) {
          return a.distance - b.distance;
        }
        return -1;
      }
      if (b.bloodGroup === recipientData.recipientBloodGroup) {
        return 1;
      }
      // Add more conditions for other blood groups as needed
      return a.distance - b.distance;
    });

    setNearestDonors(sortedDonors);
  }, [recipientData.recipientLatitude, recipientData.recipientLongitude, recipientData.recipientBloodGroup]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRequestBlood = (donor) => {
    axios.post('http://localhost:5000/api/recipient/create-request', { donorId: donor._id, recipientId: recipientData._id })
      .then(response => {
        if (response.status === 201) {
          console.log('Request sent successfully', response.data);
          setRequestedDonor(donor); // Update requestedDonor state only after successful request
          setRequestedDonorName(donor.name);
          setTimeout(() => {
            setRequestedDonor(null); // Clear requestedDonor state after 5 seconds
          }, 5000);
        } else if (response.status === 200) {
          console.log('Request already sent bro');
          setRequestedDonorName(donor.name);
          setErrorMsg("error");
          setTimeout(() => {
            setErrorMsg(null); // Clear errorMsg state after 5 seconds
          }, 5000);
        }
      })
      .catch(error => {
        console.error('Error sending request:', error);
      });
  };

  const filteredDonors = nearestDonors.filter(donor =>
    donor.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const alertDonorName=requestedDonor;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Display spinner icon */}
      </div>
    );
  }

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
      {
        nearestDonors &&
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
      }
{requestedDonor && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-5 p-3 text-center w-75" role="alert">
          <strong className="font-bold">Request sent!</strong>
          <span className="block sm:inline"> Your request has been sent to <strong className="font-bold">{requestedDonorName}</strong>. Check your request status in MyRequests Page</span>
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-5 p-3 text-center w-75" role="alert">
          <strong className="font-bold">Request already sent!</strong>
          <span className="block sm:inline"> Your request has already been sent to <strong className="font-bold">{requestedDonorName}</strong>. Check your request status in MyRequests Page</span>
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