import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineUser, AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { googleLogout } from '@react-oauth/google';
import { FiUsers } from 'react-icons/fi';
import { RiHeartFill } from 'react-icons/ri';
import { MdOutlineLiveTv } from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import Logo from '../utils/TikTok_logo.webp';
import LoginModal from './LoginModal';
import { BiMessageAltDots } from "react-icons/bi";
import { TiLocationArrowOutline } from "react-icons/ti";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
 // Show dropdown immediately when hovering over the profile icon
 const showDropdown = () => {
  if (dropdownTimeout.current) {
    clearTimeout(dropdownTimeout.current);
  }
  setIsDropdownOpen(true);
};

// Delay hiding the dropdown, allowing the user to move to the dropdown menu
const startHideDropdown = () => {
  dropdownTimeout.current = setTimeout(() => {
    setIsDropdownOpen(false);
  }, 1000); // Adjust the timeout as needed
};

// Cancel the hide action if moving back to dropdown or profile icon
const cancelHideDropdown = () => {
  if (dropdownTimeout.current) {
    clearTimeout(dropdownTimeout.current);
  }
};

// Cleanup on component unmount
useEffect(() => {
  return () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
  };
}, []);
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4'>
      <Link href='/'>
        <div className='w-[90px] md:w-[125px] md:h-[30px] h-[38px]'>
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

      <div className="relative" onMouseLeave={startHideDropdown}>
        {user ? (
          <div className="flex items-center gap-2 md:gap-4"> {/* Adjust the gap as needed */}
            <Link href="/upload">
              <button className=" mr-2 border px-2 py-1.5 rounded-sm md:px-4 text-md font-semibold flex items-center hover:bg-gray-200">
                <IoMdAdd className="text-lg" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            <TiLocationArrowOutline className="text-4xl mb-2 cursor-pointer" title="Messages" />
            <BiMessageAltDots className="text-3xl cursor-pointer" title="Inbox" />

            <div onMouseEnter={showDropdown} className="cursor-pointer mr-2 ml-2">
              <Image
                src={user.image || "/default-avatar.png"}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
            <div onMouseEnter={cancelHideDropdown} className="font-semibold text-md absolute mt-[3rem] right-0 w-48 bg-white rounded-md shadow-xl py-1 z-50">
                <Link href={`/profile/${user._id}`}>
                  <a className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"><AiOutlineUser className='inline ml-1 text-2xl mr-1' /> View profile</a></Link>
                <Link href="/following"><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><RiHeartFill className="inline ml-1 text-2xl mr-1"/> Following</a></Link>
                <Link href="/friends"><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><FiUsers className="inline ml-1 text-2xl mr-1"/> Friends</a></Link>
                <Link href="/explore"><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><AiOutlineSearch className="inline ml-1 text-2xl mr-1"/> Explore</a></Link>
                <Link href="/live"><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><MdOutlineLiveTv className="inline ml-1 text-2xl mr-1"/> LIVE</a></Link>
                <Link href="/settings"><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><AiOutlineSetting className="inline ml-1 text-2xl mr-1"/> Settings</a></Link>
                <button
                  onClick={(e) => {
                    googleLogout();
                    removeUser();
                  }}
                  className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100 font-semibold border-t border-gray-200"
                >
                  <AiOutlineLogout className="inline ml-1 text-2xl mr-1" />  Log out
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
