import React, { useEffect, useState } from 'react';
// import Cookies from 'cookies';
import Cookies from 'js-cookie';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Post from '../components/Post';
import Layout from '../components/layout/DefaultLayout';
import PostSkeleton from '../components/skeleton/PostSkeleton';
// import UserContext from '../context/UserContext';

const GET_HOMEPAGE = gql`
  query GetHomepage($token: String!) {
    getHomepage(token: $token){
      _id
      user {
        username
      }
      content
      createdAt
      likesInfo {
        likesRate
        isLiked
      }
      commentsInfo {
        count
      }
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  const { error, data: comingData } = useQuery(GET_HOMEPAGE, {
    variables: { token },
    // pollInterval: 5000,
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    if (error) {
      if (error.message === 'activate_email') {
        router.push('/verificate');
      } else {
        Cookies.set('token', '');
        Cookies.set('user', '');
        router?.push('/');
      }

      return;
    }

    const popularPosts = [];
    const otherPosts = [];

    comingData?.getHomepage.map((post) => {
      if ((post.likesInfo.likesRate >= 3 || post.commentsInfo.count > 10)
      && popularPosts.length <= 1) {
        popularPosts.push(post);
      } else {
        otherPosts.push(post);
      }
      return '';
    });

    setData([...popularPosts, ...otherPosts]);
  }, [data]);

  return (
    <Layout>
      {
        comingData ? data.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            username={post.user?.username}
            // createdAt={post.createdAt}
            content={post.content}
            createdAt={post.createdAt}
            likesInfo={post.likesInfo}
            // today={today}
            commentsCount={post.commentsInfo?.count}
            truncate
          />
        )) : (
          <div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )
      }
    </Layout>
  );
};

export default Home;
