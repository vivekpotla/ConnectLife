import React from "react";
import initialProcessingImage from '../Images/initial-processing.png';
import infectiousDiseaseTestingImage from '../Images/infectious-disease-testing.png';
import storageDistributionImage from '../Images/storage-distribution.png';

const BloodProcessing = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">Blood Processing and Distribution</h1>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <img src={infectiousDiseaseTestingImage} alt="Infectious Disease Testing" className="w-auto h-44 rounded-lg mr-0 lg:mr-4" />
        <div>
          <h2 className="text-xl font-semibold mb-2 text-red-500">Testing and Processing</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">The blood bag is labelled with a unique identification number and stored at a controlled temperature.</li>
            <li className="mb-2">The blood undergoes rigorous testing for various infectious diseases like HIV, hepatitis, and syphilis. This ensures the safety of the recipient.</li>
            <li>In many cases, the blood isn't used as whole blood. A centrifuge separates the blood into its main components: Red Blood Cells, Plasma, and Platelets.</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center mt-6 lg:mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-red-500">Storage and Distribution</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">Depending on how it's processed, the blood components are stored in special refrigerators or freezers at controlled temperatures to maintain their quality and effectiveness.</li>
            <li className="mb-2">Hospitals and medical facilities in need of blood components place orders with the blood bank. The blood bank then delivers the requested components based on factors like blood type, compatibility, and urgency.</li>
          </ul>
        </div>
        <img src={storageDistributionImage} alt="Storage and Distribution" className="w-auto h-44 rounded-lg ml-0 lg:ml-4" />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center mt-6 lg:mt-8">
        <img src={initialProcessingImage} alt="Initial Processing" className="w-auto h-44 rounded-lg mb-4 lg:mr-4 lg:mb-0" />
        <div>
          <h2 className="text-xl font-semibold mb-2 text-red-500">Blood Bank's Role</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">NGO camps typically collaborate with licensed blood banks for safe collection, processing, storage, and distribution of blood products.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-xl font-semibold text-center">
        <p>The entire process, from donation to reaching a patient in need, can take anywhere from a few days to a couple of weeks, depending on various factors.</p>
      </div>
    </div>
  );
};

export default BloodProcessing;
