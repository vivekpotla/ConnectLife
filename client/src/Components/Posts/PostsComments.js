import React, { useState } from 'react';

export default function PostsComments({ postId, comments, onAddComment }) {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
      if (newComment.trim() !== '') {
        onAddComment(postId, newComment);
        setNewComment('');
      }
    };
  
    return (
      <div className="p-4  pb-6 ">
        <ul className="space-y-2">
          {comments && comments.map((comment, index) => (
            <li key={index} className="text-gray-700">{comment}</li>
          ))}
        </ul>
        <div className="flex">
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-red-500"
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <button
            className="ml-2 bg-red-500 text-white font-semibold px-2 rounded-md"
            onClick={handleAddComment}
          >
            Comment
          </button>
        </div>
      </div>
    );
  };
  