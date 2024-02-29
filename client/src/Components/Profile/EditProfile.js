import React from 'react';
import { useForm } from 'react-hook-form';

export default function EditProfile() {
  //code for getting donor profile details from redux store
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    //code for updating details in DB
  };


  return (
    <div className='row  bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200  py-6 px-60'>
      <div className='col-md-5 '>
  <h1 className='mt-5'>Edit Profile</h1>
  <img 
    src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png" 
    alt="Edit profile icon" 
    className="flex flex-col items-center rounded-full w-80 h-80 object-cover mt-5"
  />
</div>

      <div className='col-md-7'>
   
    <div className='container '>
    
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 p-4 bg-gray-100 rounded-lg shadow-lg max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            {...register('name')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='bharadwaj'//{donor.name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">AadharNumber:</label>
          <input
            type="text"
            {...register('aadhar')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='546789789456'//{donor.aadharNumber}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="text"
            {...register('email')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='saipachipala@gmail.com'//{donor.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">PhoneNumber:</label>
          <input
            type="text"
            {...register('phoneNumber')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='6301496072'//{donor.phoneNumber}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">BloodGroup:</label>
          <input
            type="text"
            {...register('bloodGroup')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='B+'//{donor.bloodGroup}
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
            value='road no 36'//{donor.address.street}
          />
          <label className="block text-gray-700 font-bold mb-2">city:</label>
          <input
            type="text"
            {...register('address.city')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='Hyderabad'//{donor.address.city}
          />
          <label className="block text-gray-700 font-bold mb-2">State:</label>
          <input
            type="text"
            {...register('address.state')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='Telangana'//{donor.address.state}
          />
          <label className="block text-gray-700 font-bold mb-2">zipcode:</label>
          <input
            type="text"
            {...register('address.zipcode')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='zipcode'//{donor.address.zipcode}
          />
          <label className="block text-gray-700 font-bold mb-2">Country:</label>
          <input
            type="text"
            {...register('address.country')}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
            value='India'//{donor.address.country}
          />
        </div>
        <div className='flex justify-end'>
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
