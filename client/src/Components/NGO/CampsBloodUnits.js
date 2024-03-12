import React from 'react';

export const CampsBloodUnits = ({ show, handleClose, donors }) => {
  if (!show) {
    return null;
  }

  const countBloodUnits = () => {
    const bloodUnitsCount = {};
    donors.forEach(donor => {
      if (donor.bloodGroup in bloodUnitsCount) {
        bloodUnitsCount[donor.bloodGroup] += donor.unitsDonated;
      } else {
        bloodUnitsCount[donor.bloodGroup] = donor.unitsDonated;
      }
    });
    return bloodUnitsCount;
  };

  const bloodUnits = countBloodUnits();

  const downloadCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Blood Group", "Total Units Donated"].join(",") +
      "\n" +
      Object.keys(bloodUnits)
        .map(bloodGroup => `${bloodGroup},${bloodUnits[bloodGroup]}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "blood_units.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold mb-2">Blood Units</h2>
        {donors.length === 0 ? ( // Check if there are no donors
          <p className="text-gray-600">No donors registered</p>
        ) : (
        <div className="overflow-y-auto max-h-72">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Units Donated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.keys(bloodUnits).map((bloodGroup, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{bloodUnits[bloodGroup]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={downloadCsv}>Download CSV</button>
          <button className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600" onClick={handleClose}>Close</button>
        </div>
          </div>
        )}
        <div className="mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};