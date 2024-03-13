import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { format, isBefore, isAfter } from 'date-fns';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { Tooltip, IconButton } from '@material-tailwind/react';
import { CampsDonors } from './CampsDonors';
import { CampsBloodUnits } from './CampsBloodUnits';

export const PreviousCamps = () => {
  const [campsData, setCampsData] = useState([]);
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [previousCamps, setPreviousCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDonorsModal, setShowDonorsModal] = useState(false);
  const [showBloodUnitsModal, setShowBloodUnitsModal] = useState(false);
  const [selectedCampDonors, setSelectedCampDonors] = useState([]);
  const [selectedCampBloodUnits, setSelectedCampBloodUnits] = useState([]);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    const fetchCampsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ngo/view-all-camps');
        const allCamps = response.data;
        setCampsData(allCamps);
        const now = new Date();
        const upcoming = allCamps.filter(camp => isAfter(new Date(camp.startDate), now));
        const previous = allCamps.filter(camp => isBefore(new Date(camp.endDate), now));
        setUpcomingCamps(upcoming);
        setPreviousCamps(previous);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching camps data:', error);
      }
    };

    fetchCampsData();
  }, []);

  const handleViewDonors = async (campId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ngo/get-donors-in-camp", { campId });
      setSelectedCampDonors(response.data.donated);
      setShowDonorsModal(true);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleViewBloodUnits = async (campId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ngo/get-blood-quantity", { campId });
      const { data } = response;
      const { campName, campAddress, bloodQuantity } = data;

      // Transform the blood quantity object into an array of objects
      const bloodUnitsArray = Object.entries(bloodQuantity).map(([bloodType, quantity]) => ({
        bloodType,
        quantity
      }));

      setSelectedCampBloodUnits({
        campName,
        campAddress,
        bloodUnits: bloodUnitsArray
      });
      setShowBloodUnitsModal(true);

    } catch (error) {
      console.error('Error fetching blood units:', error);
    }
  };
  console.log(selectedCampBloodUnits)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Blood Donation Camps</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Camps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingCamps.map((camp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col relative justify-between">
              <img src={camp.imageURL} alt={camp.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold mb-2">{camp.name}</h2>
              <p className="text-gray-600 mb-2">Date: {format(new Date(camp.startDate), 'MM/dd/yyyy')}</p>
              <p className="text-gray-600 mb-2 line-clamp-3">Location: {camp.location}</p>
              <div className='absolute right-3'>
                <Tooltip content="Send Mail to Volunteers">
                  <IconButton disabled={notify} variant='text' onClick={async () => {
                    setNotify(true);
                    await axios.post("http://localhost:5000/api/ngo/notify-volunteers-email", { campId: camp._id }).then((res) => {
                      setTimeout(() => {
                        setNotify(false);
                      }, 120000);
                    }).catch((error) => {
                      console.log(error);
                    });
                    await axios.post("http://localhost:5000/api/ngo/notify-volunteers", { campId: camp._id }).then((res) => {
                      setTimeout(() => {
                        setNotify(false);
                      }, 120000);
                    }).catch((error) => {
                      console.log(error);
                    });
                  }}>
                    <BellAlertIcon className='w-6 h-6' fill='red' />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 mt-4  text-center">Previous Camps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previousCamps.map((camp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col relative justify-between">
              <img src={camp.imageURL} alt={camp.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold mb-2">{camp.name}</h2>
              <p className="text-gray-600 mb-2">Date: {format(new Date(camp.startDate), 'MM/dd/yyyy')}</p>
              <p className="text-gray-600 mb-2 line-clamp-3">Location: {camp.location}</p>
              <div className="flex justify-around mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleViewDonors(camp._id)}
                >
                  View Donors
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleViewBloodUnits(camp._id)}
                >
                  View Blood Units
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CampsDonors show={showDonorsModal} handleClose={() => setShowDonorsModal(false)} donors={selectedCampDonors} />
      {showBloodUnitsModal && selectedCampBloodUnits && ( // Add a check for selectedCampBloodUnits
      <CampsBloodUnits
        show={showBloodUnitsModal}
        handleClose={() => setShowBloodUnitsModal(false)}
        selectedCampBloodUnits={selectedCampBloodUnits}
        donors={selectedCampDonors}
      />
    )}
    </div>
  );
};
