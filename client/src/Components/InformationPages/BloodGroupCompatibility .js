import React from "react";

const BloodGroupCompatibility = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">Blood Group Compatibility</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border  border-gray-500 mx-auto">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="border border-gray-500 px-2 text-left">Blood Group</th>
              <th className="border  border-gray-500 px-4 py-2 text-left">Can Donate To</th>
              <th className="border border-gray-500 px-4 py-2 text-left">Can Receive From</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-gray-700">
            <tr>
              <td className="border border-gray-500 px-4 py-2">A+</td>
              <td className="border border-gray-500 px-4 py-2">A+, AB+</td>
              <td className="border border-gray-500 px-4 py-2">A+, A-, O+, O-</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">A-</td>
              <td className="border border-gray-500 px-4 py-2">A+, A-, AB+, AB-</td>
              <td className="border border-gray-500 px-4 py-2">A-, O-</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">B+</td>
              <td className="border border-gray-500 px-4 py-2">B+, AB+</td>
              <td className="border border-gray-500 px-4 py-2">B+, B-, O+, O-</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">B-</td>
              <td className="border border-gray-500 px-4 py-2">B+, B-, AB+, AB-</td>
              <td className="border border-gray-500 px-4 py-2">B-, O-</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">AB+</td>
              <td className="border border-gray-500 px-4 py-2">AB+</td>
              <td className="border border-gray-500 px-4 py-2">Everyone</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">AB-</td>
              <td className="border border-gray-500 px-4 py-2">AB+, AB-</td>
              <td className="border border-gray-500 px-4 py-2">A-, B-, AB-, O-</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">O+</td>
              <td className="border border-gray-500 px-4 py-2">Everyone</td>
              <td className="border border-gray-500 px-4 py-2">O+, O-</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">O-</td>
              <td className="border border-gray-500 px-4 py-2">Everyone</td>
              <td className="border border-gray-500 px-4 py-2">O-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-md font-semibold text-center">
        <p>Knowing blood compatibility is crucial for safe blood transfusions. For more information about blood processing steps,  
        <a href="http://localhost:3000/bloodprocessing" className="text-red-500">visit this link</a>.</p>
      </div>
    </div>
  );
};

export default BloodGroupCompatibility;
