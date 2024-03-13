import React from 'react';

export const CampsBloodUnits = ({ show, handleClose, selectedCampBloodUnits }) => {
  // Check if selectedCampBloodUnits is not available yet
  if (!selectedCampBloodUnits) {
    return null; // Return null to prevent rendering the component
  }

  // Once selectedCampBloodUnits is available, continue with rendering the component
  const downloadCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Blood Group", "Total Units Donated"].join(",") +
      "\n" +
      selectedCampBloodUnits.bloodUnits.map(bloodUnit => `${bloodUnit.bloodType},${bloodUnit.quantity}`).join("\n");
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
        <div className="overflow-y-auto max-h-72">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Units Donated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedCampBloodUnits.bloodUnits.map((bloodUnit, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{bloodUnit.bloodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{bloodUnit.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={downloadCsv}>Download CSV</button>
            <button className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
