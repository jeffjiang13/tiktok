import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlineLiveTv } from 'react-icons/md';
import Image from 'next/image';

import {
  AiFillHome,
  AiOutlineMenu,
  AiFillBell,
  AiOutlineUser,
  AiOutlineSearch,
} from 'react-icons/ai';
import { RiVideoAddFill, RiHeartFill } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { IUser } from '../types';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();
  const { userProfile } = useAuthStore(); // Assuming useAuthStore returns a userProfile
  const [user, setUser] = useState<IUser | null>();
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-red-500 rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';
  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 scrollable-sidebar'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome className=''/>
                </p>
                <span className='capitalize text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
              <>
                <Link href='/following'>
                  <div className={pathname === '/following' ? activeLink : normalLink}>
                    <RiHeartFill className='text-2xl'/>
                    <span className='capitalize text-xl hidden xl:block'>Following</span>
                  </div>
                </Link>
                <Link href='/friends'>
                  <div className={pathname === '/friends' ? activeLink : normalLink}>
                    <FiUsers className='text-2xl'/>
                    <span className='capitalize text-xl hidden xl:block'>Friends</span>
                  </div>
                </Link>
                <Link href='/explore'>
                  <div className={pathname === '/explore' ? activeLink : normalLink}>
                    <AiOutlineSearch className='text-2xl'/>
                    <span className='capitalize text-xl hidden xl:block'>Explore</span>
                  </div>
                </Link>
                {/* Live Streams */}
                <Link href='/live'>
                  <div className={pathname === '/live' ? activeLink : normalLink}>
                    <MdOutlineLiveTv className='text-2xl'/>
                    <span className='capitalize text-xl hidden xl:block'>Live</span>
                  </div>
                </Link>

              {/* User Profile Image or Icon */}
              {user ? (
              user.image ? (
                <Link href={`/profile/${user._id}`}>
                  <div className={pathname === `/profile/${user._id}` ? activeLink : normalLink}>
                    <Image
                      className='rounded-full cursor-pointer'
                      src={user.image}
                      alt='user'
                      width={30}
                      height={30}
                    />
                    <span className='capitalize text-xl hidden xl:block'>Profile</span>
                    </div>
                </Link>
              ) : (
                <Link href='/profile'>
                  <div className={pathname === '/profile' ? activeLink : normalLink}>
                    <AiOutlineUser className='text-2xl' />
                    <span className='capitalize text-xl hidden xl:block'>Profile</span>
                  </div>
                </Link>
              )
            ) : (
              <Link href='/auth/login'>
                <div className={normalLink}>
                  <AiOutlineUser className='text-2xl' />
                  <span className='capitalize text-xl hidden xl:block'>Profile</span>
                </div>
              </Link>
            )}
              </>
          </div>
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <br />
          <br />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
