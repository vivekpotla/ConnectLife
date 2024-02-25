import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import ReactModal from 'react-modal';
import Create_Post from '../Images/Create_Post.png'
import { RegisterPost } from './RegisterPost';

export const CreatePosts = () => {
  const [post, setPost] = useState(false);
  const navigate = useNavigate();
  const addData = () => {
    setPost(false);
  }
  return (
    <div className='ml-3'>
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img src={Create_Post}></img>
      <Button size="md" variant="gradient" color='red' 
      className="select-none rounded-lg block w-full hover:scale-105 focus:scale-105 active:scale-100" onClick={() => setPost(true)}>
        New Awareness Post
      </Button>
    </div>
      <ReactModal
        isOpen={post}
        onRequestClose={() => setPost(false)}
        contentLabel='Create Post'
      >
        <div className="flex justify-end fixed end-16">
          <button onClick={() => setPost(false)} className="bg-transparent border-none text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className='flex flex-col-reverse md:flex-row justify-evenly mt-4'>
          <RegisterPost addData={addData} />
        </div>
      </ReactModal>
    </div>
  )
}
