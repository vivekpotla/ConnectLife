import React from "react";
import { Link } from "react-router-dom";
import registrationImage from '../Images/registration.gif';
import donationImage from '../Images/donation.png';
import postDonationImage from '../Images/post-donation.png';

const BloodDonationProcess = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center">Blood Donation Process</h1>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <img src={registrationImage} alt="Registration" className="w-auto h-44 rounded-lg mb-4 lg:mr-4 lg:mb-0" />
        <div>
          <h2 className="text-xl font-semibold mb-2 text-red-500">Pre-donation (Registration)</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">You'll be greeted by NGO volunteers and handed a registration form.</li>
            <li>It will likely have a questionnaire about your medical history, including recent illnesses, medications, travel history, and any history of blood transfusions. Be honest and thorough in your responses.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-red-500">Pre-donation screening</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">This is a quick check to ensure your basic eligibility for donation.</li>
            <li className="mb-2">An NGO volunteer or medical staff might use a finger prick test to measure your hemoglobin level. Hemoglobin is a protein in red blood cells that carries oxygen. Low levels can indicate anemia, making you unsuitable for donation at that time.</li>
            <li>Some camps might also have a blood pressure check.</li>
          </ul>
        </div>
        <img src={donationImage} alt="Donation" className="w-auto h-52 rounded-lg ml-0 lg:ml-4" />
      </div>

      <div className="mb-8 flex flex-col lg:flex-row lg:items-center">
        <img src={postDonationImage} alt="Post Donation" className="w-50 h-36 rounded-lg mb-4 lg:mr-4 lg:mb-0" />
        <div>
          <h2 className="text-xl font-semibold mb-2 mt-2 text-red-500">Donation (Medical Check-up and Collection)</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2"><strong className="text-gray-700">Volunteer Support:</strong> Friendly NGO volunteers will be around to answer questions, guide you through the process, and ensure a smooth experience.</li>
            <li className="mb-2"><strong className="text-gray-700">Doctor's Consultation:</strong> A doctor or qualified medical professional will review your registration form and discuss your medical history in detail.</li>
            <li className="mb-2"><strong className="text-gray-700">Blood Donation:</strong> If deemed fit, you'll be comfortably seated or positioned on a reclining chair in a designated donation area.</li>
            <li><strong className="text-gray-700">Post-donation instructions:</strong> The medical staff will provide you with post-donation care instructions.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-xl font-semibold text-center">
        <p>Your decision to donate blood can make a significant impact on the lives of others. Thank you for considering blood donation!</p>
        <Link to="/camps">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Schedule an Appointment</button>
        </Link>
      </div>
    </div>
  );
};

export default BloodDonationProcess;
