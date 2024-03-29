import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../store/authStore';
import { createOrGetUser } from '../utils';
import { AiOutlineClose } from 'react-icons/ai'; // Import Close icon


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { addUser } = useAuthStore();


  // Only render the modal if it is "open"
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      {/* Added red border classes here */}
      <div className="relative bg-white py-4 rounded-lg shadow-lg flex flex-col px-10 items-center border-2 border-red-500">
        <button onClick={onClose} className="p-1 absolute top-2 right-2 text-3xl text-black bg-gray-100 rounded-full hover:bg-gray-200 transition duration-150 ease-in-out">
          <AiOutlineClose className="text-2xl" /> {/* Ensure icon is visible */}
        </button>
        <h2 className="text-4xl font-bold mb-4 mt-8">Log in to TikTok</h2>
        <p className="mb-6">Please login to continue.</p>
        <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login Failed')}
        />
        <p className="mt-10 text-center text-xs text-gray-400">By continuing, you agree to TikTok&apos;s Terms of Service and</p>
        <p className="mb-10 text-center text-xs text-gray-400">confirm that you have read TikTok&apos;s Privacy Policy.</p>
      </div>
    </div>
  );
};

export default LoginModal;
