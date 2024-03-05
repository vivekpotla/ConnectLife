import React from 'react';
import { useForm} from 'react-hook-form';
import  {useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
export default function EditProfile() {
  //code for getting donor profile details from redux store
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { userType } = useParams();
  const navigate = useNavigate();

   // Function to retrieve donor details from local storage
   const getDonorDetailsFromLocalStorage = () => {
    const donorDetails = JSON.parse(localStorage.getItem('user'));
    return donorDetails || {};
  };

  useEffect(() => {
    // Get donor details from local storage
    const donor = getDonorDetailsFromLocalStorage();
    console.log(donor)
    // Set initial form values using setValue
    Object.keys(donor).forEach((key) => {
      setValue(key, donor[key]);
    });
  }, [setValue]);

  const onSubmit = async(data) => {
    try {
      setLoading(true); // Set loading state to true when form is submitted
      // Make the PUT request using axios
      await axios.post(`http://localhost:5000/api/donor/updateDonorProfile`, data).then((res) => {
        console.log('Profile updated successfully:', res.data);
        // Optionally, you can perform additional actions after successful profile update
      }).catch((error) => {
        console.error('Failed to update profile:', error.response.data);
        setMessage(error.response.data.message);
      });

      // Optionally, you can perform additional actions after successful profile update
    } catch (error) {
      console.error('Error updating profile:', error.message || "An error occurred");
      setMessage(error.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false when request completes
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
          <div className="flex items-center justify-center mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png" 
              alt="Edit profile icon" 
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">AadhaarNumber:</label>
          <input
            type="text"
            {...register('aadhaarNumber')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            //{donor.aadharNumber}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="text"
            {...register('email')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
           //{donor.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">PhoneNumber:</label>
          <input
            type="text"
            {...register('phoneNumber')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            //{donor.phoneNumber}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">BloodGroup:</label>
          <input
            type="text"
            {...register('bloodGroup')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
           
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address:</label>
          <label className="block text-gray-700 font-bold mb-2">street:</label>
          <input
            type="text"
            {...register('address.street')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            
          />
          <label className="block text-gray-700 font-bold mb-2">city:</label>
          <input
            type="text"
            {...register('address.city')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
           
          />
          <label className="block text-gray-700 font-bold mb-2">State:</label>
          <input
            type="text"
            {...register('address.state')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            
          />
          <label className="block text-gray-700 font-bold mb-2">zipcode:</label>
          <input
            type="text"
            {...register('address.postalCode')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            
          />
          <label className="block text-gray-700 font-bold mb-2">Country:</label>
          <input
            type="text"
            {...register('address.country')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
           
          />
        </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
