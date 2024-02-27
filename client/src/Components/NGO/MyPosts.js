import React from 'react'
import { useState } from 'react';
import img from '../Images/Create_Post.png';

function MyPosts() {
  const [postsData,setPosts] = useState([
    {
      id: 1,
      title: "Post 1",
      description: "Description of Post 1",
      image: img,
    },
    {
      id: 2,
      title: "Post 2",
      description: "Description of Post 2",
      image: img,
    },
    {
      id: 3,
      title: "Post 3",
      description: "Description of Post 3",
      image:img,
    },
  ]);

  const [editPost, setEditPost] = useState(null); // Post being edited
  const [deletePostId, setDeletePostId] = useState(null); // Post ID to delete
  const [isDeleted, setIsDeleted] = useState(false); 
  const handleEditPost = (post) => {
    // Set the post being edited
    setEditPost(post);
  };

  const handleSaveEdit = (editedPost) => {
    // Update the post in the state
    const updatedPosts = postsData.map(post => (post.id === editedPost.id ? editedPost : post));
    setPosts(updatedPosts);
    setEditPost(null); // Clear editing state
  };

  const handleDeletePost = (postId) => {
    // Set the post ID to delete and show confirmation dialog
    setDeletePostId(postId);
  };

  const confirmDelete = () => {
    // Remove the post from the state
    const updatedPosts = postsData.filter(post => post.id !== deletePostId);
    setPosts(updatedPosts);
    setIsDeleted(true); // Set deletion flag
    setDeletePostId(null); // Clear delete confirmation state
  };

  const cancelDelete = () => {
    // Cancel delete action
    setDeletePostId(null); // Clear delete confirmation state
  };

  
  return (
    <>
      {isDeleted && <h5 className="text-xl mt-4 text-green-500 mb-4 text-center">Post successfully deleted!</h5>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {postsData.map(post => (
      <div key={post.id} className="border border-gray-300 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-2">{post.description}</p>
        <img src={post.image} alt={post.title} className="w-full h-auto mb-2" />
        <div className="flex justify-between">
          <button className="text-blue-500 hover:text-blue-700 mr-2 flex" onClick={() => handleEditPost(post)}>
          Edit<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue ms-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg></button>
          <button className="text-red-500 hover:text-red-700 flex" onClick={() => handleDeletePost(post.id)}>
            Delete 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue ms-1 mt-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
            d="M1 3.5h12m-10.5 0h9v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1zm2 0V3a2.5 2.5 0 1 1 5 0v.5m-4 3.001v4.002m3-4.002v4.002"/></svg>
          </button>
        </div>
        {editPost && editPost.id === post.id && (
          <EditForm post={editPost} onSaveEdit={handleSaveEdit} onCancelEdit={() => setEditPost(null)} />
        )}
      </div>
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
    </>
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

return (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-12 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className='border rounded-lg mb-2 border-gray-500 p-2 w-full'/>
        <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}  className='border rounded-lg  border-gray-500 p-2 w-full'/>
        <div className="flex justify-center">
        <button type="button" onClick={onCancelEdit} className='bg-gray-300 rounded-lg m-2 p-2'>Cancel</button>
          <button type="submit" className='bg-green-500 rounded-lg m-2 ps-2 pr-2'>Save</button>
        </div>
      </form>
    </div>
  </div>
);
};

export default MyPosts;