import React from 'react';
import { NextPage } from 'next';
import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-gray-500 text-xs  hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className='mt-6 hidden xl:block'>
    <h2 className='text-gray-500 font-semibold' >Company</h2>
    <List items={footerList1} mt={false}/>
    <br />
    <h2 className='text-gray-500 font-semibold' >Programs</h2>
    <List items={footerList2} mt={false}  />
    <br />
    <h2 className='text-gray-500 font-semibold'>Terms & Policies</h2>
    <List items={footerList3} mt={false} />
    <p className='text-gray-500 text-xs mt-5'>© 2024 TikTok Clone. Created by Jeff Jiang</p>
  </div>
);

export default Footer;
