import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../Redux/slices/userSlice';

const CarouselCard = () => {
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userType = JSON.parse(localStorage.getItem('user'))?.userType;

    const handleBookAppointment = () => {
        // Check if the user is authenticated and their userType

        // Navigate based on the user's authentication and userType
        if (isLoggedIn && userType === 'donor') {
            navigate('/camps'); // Navigate to '/camps' if logged in as donor
        } else {
            localStorage.clear();
            logout();
            navigate('/login/Donor'); // Navigate to '/login' if not logged in or userType is not donor
        }
    };

    return (
        <div className="bg-white">
            <div className="flex flex-col justify-between h-[55vh] p-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Donate Blood, Save Lives</h2>
                    <p className="text-gray-600 mb-4">Short on time but big on impact?<br></br> Donating blood takes less than an hour and can make <br></br>a world of difference to someone in need.<br></br>  It's a simple act with a powerful result - the chance to save a life.</p>
                </div>
                <button className="mr-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    onClick={handleBookAppointment}>
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default CarouselCard;