import React from 'react';
import axios from 'axios';

import VideoCard from '../components/ExploreVideos';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import Discover from '../components/Discover';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className=''>
          <div >
    <Discover />
    </div>
      {videos.length ? (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-1'>
          {videos.map((video: Video) => (
            <VideoCard post={video} isShowingOnHome key={video._id} />
          ))}
        </div>
      ) : (
        <NoResults text='No Videos' />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response;
  try {
    if(topic) {
      response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    } else {
      response = await axios.get(`${BASE_URL}/api/post`);
    }

    return {
      props: { videos: response.data },
    };
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return {
      props: { videos: [] },
    };
  }
};
