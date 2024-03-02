import { Button, Dialog, DialogBody, DialogHeader, IconButton, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router';
import ReactModal from 'react-modal';
import Create_Post from '../Images/Create_Post.png'
import RegisterPost from './RegisterPost';

export const CreatePosts = () => {
  const [post, setPost] = useState(false);
  // const navigate = useNavigate();
  const addData = () => {
    setPost(false);
  }
  return (
    <div className='ml-3'>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img src={Create_Post} alt='PostImage'></img>
        <Button size="md" variant="gradient" color='red'
          className="select-none rounded-lg block w-full hover:scale-105 focus:scale-105 active:scale-100" onClick={() => setPost(true)}>
          New Awareness Post
        </Button>
      </div>
      <Dialog open={post} size='md' handler={(value) => { setPost(value) }} className=''>
        <DialogHeader className='justify-between'>
          <Typography color="blue-gray" className='ml-4 font-semibold text-xl md:font-extrabold md:text-3xl'>Create Post</Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => setPost(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-auto h-[80vh] md:m-2">
          <div className='flex items-center justify-center'>
            <RegisterPost />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  )
}
