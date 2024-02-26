import React from 'react'
import NGORegistration from './NGORegistration';
import VolunteerRegistration from './VolunteerRegistration';
import DonorRegistration from './DonorRegistration';
import RecipientRegistration from './RecipientRegistration';
import { useNavigate, useParams } from 'react-router';
import SignupForm from './SignUp';

const Registration = () => {

    const { userType } = useParams();
    const navigate = useNavigate();

    console.log(userType);

    const userButtonStyle = {
        active: "border border-blue-gray-300 rounded-lg w-24 text-center py-1 cursor-pointer bg-red-600 font-semibold transition duration-300 ease-in-out transform hover:scale-105",
        inactive: "border border-blue-gray-300 rounded-lg w-24 text-center py-1 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
    };

    const selectComponent = (type) => {

        switch (type) {
            case 'NGO':
                return <NGORegistration />
            case 'Volunteer':
                return <VolunteerRegistration />
            case 'Donor':
                return <DonorRegistration />
            case 'Recipient':
                return <RecipientRegistration />
            default:
                <div>
                    select what you want to do..
                </div>
        }
    };


    return (
        <div className='bg-gray-100 py-1 h-screen'>
            <div className='flex flex-row gap-5 my-3 justify-center flex-wrap text-sm'>
                <div className={userType === "NGO" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/SignUp/NGO")}>NGO</div>
                <div className={userType === "Volunteer" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/SignUp/Volunteer")}>Volunteer</div>
                <div className={userType === "Donor" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/SignUp/Donor")}>Donor</div>
                <div className={userType === "Recipient" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/SignUp/Recipient")}>Recipient</div>
            </div>
            {selectComponent(userType)}
            {/* <SignupForm /> */}
        </div>
    )
}

export default Registration