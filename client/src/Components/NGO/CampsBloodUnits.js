import React from 'react';

export const CampsBloodUnits = ({ show, handleClose, selectedCampBloodUnits, donors }) => {
  // Check if selectedCampBloodUnits is not available yet or if it has no blood units
  if (!selectedCampBloodUnits || !selectedCampBloodUnits.bloodUnits || selectedCampBloodUnits.bloodUnits.length === 0) {
    return null; // Return null to prevent rendering the component until data is loaded
  }

  // Replace blood quantity of 999 with 0
  const bloodUnitsWithZero = selectedCampBloodUnits.bloodUnits.map(bloodUnit => ({
    ...bloodUnit,
    quantity: bloodUnit.quantity === 999 ? 0 : bloodUnit.quantity
  }));

  // Calculate total sum of blood quantities
  const totalBloodQuantity = bloodUnitsWithZero.reduce((acc, bloodUnit) => acc + bloodUnit.quantity, 0);

  const downloadCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Blood Group", "Total Units Donated"].join(",") +
      "\n" +
      bloodUnitsWithZero.map(bloodUnit => `${bloodUnit.bloodType},${bloodUnit.quantity}`).join("\n");
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
        <h2 className="text-xl mb-2">Total Blood Units: {totalBloodQuantity} Units</h2>
        <div className="max-h-72 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Units Donated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bloodUnitsWithZero.map((bloodUnit, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{bloodUnit.bloodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{bloodUnit.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {donors.length === 0 && (
          <div className="mt-4">
            <p className="text-gray-600 text-center mb-2">No donors registered</p>
            <button className="bg-gray-500 text-white flex mx-auto px-4 py-2 rounded hover:bg-gray-600" onClick={handleClose}>Close</button>
          </div>
        )}
        {donors.length !== 0 && (
          <div className="sticky bottom-4 flex justify-end mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={downloadCsv}>Download CSV</button>
            <button className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600" onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};
