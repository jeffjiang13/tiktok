import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineUser, AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { FiUsers } from 'react-icons/fi';
import { RiHeartFill } from 'react-icons/ri';
import { MdOutlineLiveTv } from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import { createOrGetUser } from '../utils';
import Logo from '../utils/TikTok_logo.webp';
import LoginModal from './LoginModal'; // Adjust the import path as needed

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let dropdownTimeout: ReturnType<typeof setTimeout>; // Correctly typed

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  const showDropdown = () => {
    clearTimeout(dropdownTimeout); // Clear any existing timeout to prevent hiding
    setIsDropdownOpen(true);
  };

  const hideDropdown = () => {
    // Set a timeout to hide the dropdown after 3 seconds
    dropdownTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 2000);
  };

  // Remember to clear the timeout if the component unmounts to prevent memory leaks
  useEffect(() => {
    return () => clearTimeout(dropdownTimeout);
  }, []);
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
          <Image
            className='cursor-pointer'
            src={Logo}
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[400px] rounded-full  md:top-0'
            placeholder='Search'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div className="relative">
        {user ? (
          <div>
            {/* Toggling dropdown on click */}
            <div onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className="cursor-pointer">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link href={`/profile/${user._id}`}>
                  <a onClick={(e)=> {
                    setIsDropdownOpen(false); // Explicitly close the dropdown
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                  <AiOutlineUser className='inline ml-1 text-2xl' /> View profile</a></Link>
                <Link href="/following"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><RiHeartFill className="inline ml-1 text-2xl"/> Following</a></Link>
                <Link href="/friends"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiUsers className="inline ml-1 text-2xl"/> Friends</a></Link>
                <Link href="/explore"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><AiOutlineSearch className="inline ml-1 text-2xl"/> Explore</a></Link>
                <Link href="/live"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><MdOutlineLiveTv className="inline ml-1 text-2xl"/> Live</a></Link>
                <Link href="/settings"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><AiOutlineSetting className="inline ml-1 text-2xl"/> Settings</a></Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents click from toggling dropdown again
                    googleLogout();
                    removeUser();
                    setIsDropdownOpen(false); // Explicitly close the dropdown
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <AiOutlineLogout className="inline ml-1 text-2xl font-bold" />  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
          <button
          onClick={() => setIsLoginModalOpen(true)}
          className=" pt-2 pb-2 px-2 md:px-6 text-md font-bold flex items-center gap-2 rounded-md bg-red-500 text-white"
        >
          Log in
        </button>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
