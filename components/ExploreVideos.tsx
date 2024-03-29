import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from 'react-icons/hi';
import { BsPlay, BsPause } from 'react-icons/bs'; // Assuming these are the icons you're using

import { Video } from './../types';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes }, isShowingOnHome }) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);
  // Update to handle mouse enter and leave
  const handleMouseEnter = () => {
    videoRef?.current?.play();
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    videoRef?.current?.pause();
    setIsHover(false);
  };

  return (
    <div className='flex flex-col pb-1'>
      <div
        onMouseEnter={handleMouseEnter} // Updated to play video on hover
        onMouseLeave={handleMouseLeave} // Updated to pause video on hover out
        className='rounded-3xl relative'>
        <Link href={`/detail/${_id}`}>
          <video
            loop
            ref={videoRef}
            src={video.asset.url}
            className='w-full rounded-2xl cursor-pointer bg-gray-100'
            style={{ height: '350px', objectFit: 'cover' }}
          ></video>
        </Link>

        {/* Adjusted div for hover actions */}

        <div className='absolute bottom-2 left-2 right-8 flex justify-between items-center'>
          {playing ? (
            <button onClick={onVideoPress}>
              <BsPause className='text-white text-2xl' />
            </button>
          ) : (
            <button onClick={onVideoPress}>
              <BsPlay className='text-white text-2xl' />
            </button>
          )}
        </div>
        <>
        {isHover && (
        <div className='absolute bottom-2 right-2 flex items-center'>
          {/* Mute/Unmute Button on the far right */}
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiOutlineVolumeOff className='text-white text-lg' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiOutlineVolumeUp className='text-white text-lg' />
            </button>
          )}
        </div>
        )}
      </>
      </div>
      <div className='px-2 mt-3'>
        <Link href={`/detail/${_id}`}>
          <p className='font-normal mb-2'>{caption}</p>
        </Link>

        {/* Container adjusted for flex space-between */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8'>
              <Link href={`/profile/${postedBy?._id}`}>
                <a>
                  <Image
                    width={32}
                    height={32}
                    className='rounded-full'
                    src={postedBy?.image}
                    alt='user-profile'
                    layout='responsive'
                  />
                </a>
              </Link>
            </div>
            <Link href={`/profile/${postedBy?._id}`}>
              <a className='flex items-center gap-1'>
                <p className='flex gap-1 items-center text-md text-primary'>
                  {postedBy.userName} <GoVerified className='text-blue-400' />
                </p>
              </a>
            </Link>
          </div>

          {/* Likes count with heart icon aligned to the right */}
          <div className='flex items-center gap-1'>
            <AiOutlineHeart className='' />
            <span>{likes?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
