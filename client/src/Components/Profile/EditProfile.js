import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function EditProfile() {
  const { register, handleSubmit } = useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(user.image); // State to store image URL
  const [isEdited, setIsEdited] = useState(false);

  const handleImageChange = (event) => {
    // Code to handle image change
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const donorId=user._id;
      console.log(data)
      const response = await axios.post(`http://localhost:5000/api/donor/updateDonorProfile/${donorId}`, data); // Make an HTTP POST request to the backend endpoint with form data
      console.log(response.data);
      // Handle success response here, e.g., show success message to the user
      const updatedUser = {
        ...user,
        ...data  // Update fields with new data from the form
      };
      // Save updated user object back to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEdited(true)
      setTimeout(() => setIsEdited(false), 1500); // Close alert after 2 seconds
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error here, e.g., show error message to the user
    }
  };

  return (
    <div className='flex justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-00 py-6 px-6'>
    {isEdited && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Updated Profile</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your profile has been successfully updated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      <div className='w-full md:max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-5'>Edit Profile</h1>
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='flex items-center justify-center mb-8 relative'>
  <label htmlFor="imageInput" className="w-32 h-32 rounded-full overflow-hidden cursor-pointer border border-gray-900">
    <img
      src={user.imageURL}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </label>
  <input
    id="imageInput"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleImageChange}
  />
</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                {...register('name')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 "
                required
                defaultValue={user.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Aadhar Number:</label>
              <input
                type="text"
                {...register('aadhar')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
                required
                defaultValue={user.aadhaarNumber}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="text"
                {...register('email')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
                required
                defaultValue={user.email}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
              <input
                type="text"
                {...register('phoneNumber')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
                required
                defaultValue={user.phoneNumber}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Blood Group:</label>
              <input
                type="text"
                {...register('bloodGroup')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
                required
                defaultValue={user.bloodGroup}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address:</label>
              <input
                type="text"
                {...register('address.street')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 mb-2"
                required
                defaultValue={user.address.street}
                placeholder="Street"
              />
              <input
                type="text"
                {...register('address.city')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 mb-2"
                required
                defaultValue={user.address.city}
                placeholder="City"
              />
              <input
                type="text"
                {...register('address.state')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 mb-2"
                required
                defaultValue={user.address.state}
                placeholder="State"
              />
              <input
                type="text"
                {...register('address.postalCode')}
                className="border rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 mb-2"
                required
                defaultValue={user.address.postalCode}
                placeholder="Zipcode"
              />
              <input
                type="text"
                {...register('address.country')}
                className="border rounded-md px-4 py-2 w-full  text-gray-700 focus:outline-none focus:border-blue-500"
                required
                defaultValue={user.address.country}
                placeholder="Country"
              />
            </div>
            <div className='flex justify-end'>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
