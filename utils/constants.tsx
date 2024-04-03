import { BsCode, BsEmojiSunglasses, BsMusicNoteBeamed } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick, GiClothes } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad, FaTools, FaTree } from 'react-icons/fa';
import { MdFlightTakeoff, MdSchool } from 'react-icons/md';

export const topics = [
  { name: 'development', icon: <BsCode /> },
  { name: 'comedy', icon: <BsEmojiSunglasses /> },
  { name: 'gaming', icon: <FaGamepad /> },
  { name: 'food', icon: <GiCakeSlice /> },
  { name: 'dance', icon: <GiGalaxy /> },
  { name: 'beauty', icon: <GiLipstick /> },
  { name: 'animals', icon: <FaPaw /> },
  { name: 'sports', icon: <FaMedal /> },
  { name: 'music', icon: <BsMusicNoteBeamed /> },
  { name: 'travel', icon: <MdFlightTakeoff /> },
  { name: 'fashion', icon: <GiClothes /> },
  { name: 'diy', icon: <FaTools /> },
  { name: 'nature', icon: <FaTree /> },
  { name: 'education', icon: <MdSchool /> },
];

export const footerList1 = ['About', 'Newsroom', 'Contact', 'Careers'];

export const footerList2 = ['TikTok for Good', 'Advertise', 'TikTok LIVE Creator Networks', 'Developers', 'Transparency', 'TikTok Rewards','TikTok Embeds'];

export const footerList3 = ['Help', 'Safety', 'Terms', 'Privacy Policy', 'Privacy Center', 'Creator Portal', 'Community Guidelines'];

// New addition to match a broad categorization seen in platforms like TikTok
export const footerList4 = ['Languages', 'Culture', 'Sports', 'Science & Education', 'Travel', 'Beauty & Fashion'];
