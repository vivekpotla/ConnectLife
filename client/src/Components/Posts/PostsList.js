import React, { useState } from 'react';
import PostsComments from './PostsComments'; // Assuming you have a separate component for comments
import img from '../Images/Create_Post.png'; // Import your image

const postsData = [
  {
    ngo: "NGO 1",
    title: "Title number 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: img,
    id: 1
  },
  {
    ngo: "NGO 2",
    title: "Title number 2",
    description: "Hello you all must donate blood.",
    image: img,
    id: 2
  },
  // Add more posts as needed
];

const PostsLists = () => {
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});

  const handleAddComment = (postId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
  };

  const handleLike = (postId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [postId]: !prevLikes[postId]
    }));
  };

  const [commentSectionOpen, setCommentSectionOpen] = useState({});

  const toggleCommentSection = postId => {
    setCommentSectionOpen(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };
  return (
    <div className='bg-gray-100'>
    <div className="max-w-xl mx-auto p-4">
    {postsData.map(post => (
      <div key={post.id} className="border border-gray-100 m-4 border rounded-sm  items-center bg-white  shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl text-gray-900 font-bold">{post.ngo}</h2>
        </div>
        <img src={post.image} alt="Post" className="w-fullobject-cover object-center" />
        <div className="p-4 border border-t-gray-200 border-b-gray-200">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.description}</p>
        </div>
        <div className="flex items-center px-2 py-2">
        <button className="text-gray-500" onClick={() => handleLike(post.id)}>
        <svg className={`h-8 w-8 ${likes[post.id] ? 'fill-red-600 text-red-500' : 'fill-gray-100 text-gray-500'}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path fill="none" />
        <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
        </svg>
        </button>
          <button className="text-gray-600 flex items-center space-x-1" onClick={() => toggleCommentSection(post.id)}>
          <svg class="h-8 w-8 text-gray-500 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <p>Comments</p>
          </button>
        </div>
        {commentSectionOpen[post.id] && (
            <PostsComments postId={post.id} comments={comments[post.id]} onAddComment={handleAddComment} />
          )}
      </div>
    ))}
  </div>
  </div>
);
};

export default PostsLists;
