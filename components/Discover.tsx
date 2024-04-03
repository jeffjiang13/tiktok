import React, { useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { topics } from '../utils/constants';

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        if (direction === 'left') {
            scrollRef.current.scrollLeft -= 300; // adjust the value as per your needs
        } else {
            scrollRef.current.scrollLeft += 300; // adjust the value as per your needs
        }
    }
  };

  const activeTopicStyle = 'py-2 bg-gray-200 hover:bg-black hover:text-white xl:border-gray-600 px-3 py-1 rounded xl:rounded-md flex items-center gap-2 justify-center cursor-pointer text-black whitespace-nowrap';
  const topicStyle = 'py-2 bg-gray-100 hover:bg-gray-200 xl:border-gray-300 px-3 py-1 rounded xl:rounded-md flex items-center gap-2 justify-center cursor-pointer text-black whitespace-nowrap';

  return (
    <div className='pb-6 flex items-center'>
      <ChevronLeftIcon className="h-8 w-8 text-black cursor-pointer rounded-full bg-white " onClick={() => scroll('left')} />
      <div
        className='flex gap-3 whitespace-nowrap overflow-x-auto'
        ref={scrollRef}
        style={{
          // Custom CSS to hide the scrollbar
          scrollbarWidth: 'none',  // For Firefox
          msOverflowStyle: 'none',  // For Internet Explorer + Edge
        }}
      >
        {/* For Webkit browsers like Safari and Chrome */}
        <style>
          {`.scrollbar-hide::-webkit-scrollbar { display: none; }`}
        </style>

        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-2xl xl:text-md'>
                {item.icon}
              </span>
              <span className='font-medium text-md capitalize'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <ChevronRightIcon className="h-8 w-8 text-black cursor-pointer rounded-full bg-white" onClick={() => scroll('right')} />
    </div>
  );
};

export default Discover;
