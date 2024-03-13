import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Typography
} from '@material-tailwind/react'
import {
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/solid'

function MyPosts() {
  const [postsData, setPosts] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      await axios.post("http://localhost:5000/api/ngo/view-my-posts", { ngoId: JSON.parse(localStorage.getItem("user"))._id }).then((res) => {
        // Assuming res.data.payload contains the post data
        setPosts(res.data);
      }).catch((error) => {
        console.log(error);
      });
    }

    getPostData();
  }, []);


  const [editPost, setEditPost] = useState(null); // Post being edited
  const [deletePostId, setDeletePostId] = useState(null); // Post ID to delete
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleEditPost = (post) => {
    // Set the post being edited
    setEditPost(post);
  };

 const handleSaveEdit = async (editedPost) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ngo/edit-delete-post", {
        postId: editedPost._id,
        type: 'edit',
        title: editedPost.title,
        description: editedPost.description,
        ngoId: editedPost.authorNGO
      });
      
      if (response.status === 200) {
        // Update the post in the state
        const updatedPosts = postsData.map(post => (post._id === editedPost._id ? editedPost : post));
        setPosts(updatedPosts)
        setIsEdited(true); // Show edit success alert
        setTimeout(() => setIsEdited(false), 1500); // Close alert after 2 seconds
        setEditPost(null); // Clear editing state
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
    setIsEdited(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/ngo/edit-delete-post", {
        postId: deletePostId,
        type: 'delete',
        ngoId: JSON.parse(localStorage.getItem("user"))._id
      });
      
      if (response.status === 200) {
        // Remove the post from the state
        const updatedPosts = postsData.filter(post => post._id !== deletePostId);
        setPosts(updatedPosts);
        setIsDeleted(true); // Show delete success alert
        setTimeout(() => setIsDeleted(false), 1500); // Close alert after 2 seconds
        setDeletePostId(null); // Clear delete confirmation state
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleDeletePost = (postId) => {
    // Set the post ID to delete and show confirmation dialog
    setDeletePostId(postId);
  };

  const cancelDelete = () => {
    // Cancel delete action
    setDeletePostId(null); // Clear delete confirmation state
  };
  return (
    <div className=' p-4'>

      <div className='text-black-500 text-4xl ms-5 mt-3 mb-5'>My Posts </div>
      {/* Post deleted popup */}
      {isDeleted && (
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Post Deleted</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The post has been successfully deleted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post edited popup */}
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Post Edited</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The post has been successfully edited.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      { postsData.length!==0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 place-items-center">
        {postsData.map(post => (
          <Card className="mt-6 md:max-w-96 max-w-72">
            <CardHeader color="blue-gray" className="relative md:h-56 h-40">
              <img
                src={post.imageURL}
                alt="card-image"
                className='w-full h-full'
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {post.title}
              </Typography>
              <p className='line-clamp-3 cursor-pointer'>
                {post.description}
              </p>
            </CardBody>
            <CardFooter className="pt-0 flex">
              <Button variant='text' color='yellow' className='px-3' ripple onClick={() => handleEditPost(post)}><PencilSquareIcon className='h-5 w-5' /></Button>
              <Button variant='text' color='red' className='px-3' ripple onClick={() => handleDeletePost(post._id)}><TrashIcon className='h-5 w-5' /></Button>
            </CardFooter>
            {editPost && editPost.id === post.id && (
              <EditForm post={editPost} onSaveEdit={handleSaveEdit} onCancelEdit={() => setEditPost(null)} />
            )}
          </Card>
        ))}
        {deletePostId && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p>Are you sure you want to delete this post?</p>
              <div className="flex justify-center mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600" onClick={confirmDelete}>Delete</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600" onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      :
      <div className='text-center text-red-400 mt-7 text-2xl font-bold'> No posts yet!</div>}
    </div>
  );
};
// EditForm component
const EditForm = ({ post, onSaveEdit, onCancelEdit }) => {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveEdit({ ...post, title: editedTitle, description: editedDescription });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
  <input
    type="text"
    value={editedTitle}
    onChange={(e) => setEditedTitle(e.target.value)}
    onKeyPress={handleKeyPress}
    className='border rounded-lg mb-2 border-gray-500 p-2 w-full'
  />
  <textarea
    value={editedDescription}
    onChange={(e) => setEditedDescription(e.target.value)}
    onKeyPress={handleKeyPress}
    className='border rounded-lg  border-gray-500 p-2 w-full'
  />
  <div className="flex justify-center">
    <button type="button" onClick={onCancelEdit} className='bg-gray-300 rounded-lg m-2 p-2'>Cancel</button>
    <button type="submit" className='bg-green-500 text-gray-100 rounded-lg m-2 ps-2 pr-2'>Save</button>
  </div>
</form>
      </div>
    </div>
  );
};

export default MyPosts;