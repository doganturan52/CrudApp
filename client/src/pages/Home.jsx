import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeCard from '../components/HomeCard';
import { getPostsAction } from '../redux/actions/post';

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return (
    <div className='flex items-center m-5 flex-wrap'>
      {
        posts && posts?.map((post, index) => (
          <HomeCard key={index} post={post} />
        ))
      }
    </div>
  )
}

export default Home