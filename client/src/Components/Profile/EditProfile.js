import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditProfile() {
  const { register, handleSubmit } = useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(user.image); // State to store image URL

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

  const onSubmit = (data) => {
    // Code for updating details in DB
    console.log(data);
  };

  return (
    <div className='flex justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 py-6 px-6'>
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
                {...register('address.zipcode')}
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
