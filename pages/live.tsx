import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';

const TikTokLive = () => {
  const [comments, setComments] = useState([
    { id: 1, user: 'Jeffjiang13', content: 'Amazing live session!' },
    { id: 2, user: 'johnsmith', content: 'OMG! ' },
    { id: 3, user: 'simonpeter', content: 'Wow! ' },
    { id: 4, user: 'andrew', content: '🚀' },
    { id: 5, user: 'matthew', content: 'Fire! 🚀' },
  ]);
  const [likes, setLikes] = useState(100);

  useEffect(() => {
    const commentInterval = setInterval(() => {
      const newComment = {
        id: comments.length + 1,
        user: `User${comments.length + 3}${comments.length + 2}${comments.length + 1}`,
        content: `Love it!`,
      };
      setComments(prevComments => [...prevComments, newComment]);
    }, 5000);
    return () => clearInterval(commentInterval);
  }, [comments]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Placeholder for video */}
      <div className="w-full max-w-lg aspect-video bg-gray-700 flex items-center justify-center">
        <span className="text-white text-lg">Live Video Feed</span>
      </div>

      {/* Interaction Icons */}
      <div className="w-full max-w-lg flex justify-around mt-4 mb-4">
        <button onClick={() => setLikes(likes + 1)} className="flex flex-col items-center">
          <AiFillHeart className="text-gray-500 text-4xl" />
          <p className="text-lg">{likes}</p>
        </button>
        <div className="flex flex-col items-center">
          <AiOutlineComment className="text-gray-500 text-4xl" />
          <p className="text-lg">{comments.length}</p>
        </div>
        <div className="flex flex-col items-center">
          <AiOutlineShareAlt className="text-gray-500 text-4xl" />
          <p className="text-lg">Share</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-48 h-96 overflow-y-scroll bg-black bg-opacity-75 p-2">
        <h2 className='text-white text-xl font-bold border-b-2 mt-1 mb-2'>LIVE Chat</h2>
        {comments.map(comment => (
          <div key={comment.id} className="mb-2 last:mb-0 text-white">
            <span className="font-bold">{comment.user}: </span>
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TikTokLive;
