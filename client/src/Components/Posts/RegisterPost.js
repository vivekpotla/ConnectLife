import React, { useState } from 'react'
import axios from 'axios';

export const RegisterPost = ({ addData }) => {
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [createdby, setCreatedby] = useState('');
    const [postImg, setPostImg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            ngo: "18028",
            name: postName,
            description,
            createdby,
            postImg
        };
        console.log(formData)
        try {
            await axios.post("http://localhost:5000/api/ngo/create-camp", formData);
            console.log("Post created successfully!");
    
            // Reset form fields after successful submission
            setPostName('');
            setDescription('');
            setCreatedby('');
            setPostImg('');
        } catch (error) {
            console.error("Error creating post:", error);
            // Handle error here
        }
    }
        const handleImageChange =async (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setPostImg(reader.result);
                }
              };
              reader.readAsDataURL(file);
              
            }
        }
    return (
    <div className="w-full mt-4 p-4 rounded-lg shadow-lg max-w-md bg-gray-100 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="postName" className="block text-gray-700 font-bold mb-2">
            Post Name
          </label>
          <input
            type="text"
            id="postName"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {postImg && (
          <div className="mb-4">
            <img src={postImg} alt="Uploaded" className="w-full h-auto" />
          </div>
        )}
        <div className='flex justify-end'>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Post
                </button>
            </div>
      </form>
    </div>
  );
};
