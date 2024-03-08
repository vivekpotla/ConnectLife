import React, { useState } from 'react';
import { format } from 'date-fns';
import { CampsDonors } from './CampsDonors';
import { CampsBloodUnits } from './CampsBloodUnits';

const campsData = [
  {
    "id": "65ce535dc22a6d56f68a344d",
    "name": "NSS Camp",
    "date": "2024-02-17",
    "location": "Hyderabad",
    "image": "https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-camp-5526365-4620411.png?f=webp",
    "startTime": "09:00",
    "endTime": "18:00",
    "donors": [
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "B+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 5", "bloodGroup": "O-", "unitsDonated": 2 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "B+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "B+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "B+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "B+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "AB+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "AB-", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
      { "name": "Donor 1", "bloodGroup": "A+", "unitsDonated": 2 },
      { "name": "Donor 2", "bloodGroup": "O-", "unitsDonated": 1 },
      { "name": "Donor 3", "bloodGroup": "B+", "unitsDonated": 3 },
      { "name": "Donor 4", "bloodGroup": "A+", "unitsDonated": 1 },
    ]
  }
];

export const PreviousCamps = () => {
  const [showDonorsModal, setShowDonorsModal] = useState(false);
  const [showBloodUnitsModal, setShowBloodUnitsModal] = useState(false);
  const [selectedCampDonors, setSelectedCampDonors] = useState([]);
  const [selectedCampBloodUnits, setSelectedCampBloodUnits] = useState([]);

  const handleViewDonors = (donors) => {
    setSelectedCampDonors(donors);
    setShowDonorsModal(true);
  };

  const handleViewBloodUnits = (donors) => { // Updated parameter name
    setSelectedCampBloodUnits(donors);
    setShowBloodUnitsModal(true);
  };

  const handleCloseModal = () => {
    setShowDonorsModal(false);
    setShowBloodUnitsModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Previous Camps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campsData.map((camp, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={camp.image} alt={camp.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">{camp.name}</h2>
            <p className="text-gray-600 mb-2">Date: {format(new Date(camp.date), 'MM/dd/yyyy')}</p>
            <p className="text-gray-600 mb-2">Location: {camp.location}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleViewDonors(camp.donors)}>View Donors</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => handleViewBloodUnits(camp.donors)}>View Blood Units</button>
            </div>
          </div>
        ))}
      </div>
      <CampsDonors show={showDonorsModal} handleClose={handleCloseModal} donors={selectedCampDonors} />
      <CampsBloodUnits show={showBloodUnitsModal} handleClose={handleCloseModal} donors={selectedCampBloodUnits} />
    </div>
  );
};
