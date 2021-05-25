import React, { useEffect } from 'react';
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
  const { error, data } = useQuery(GET_HOMEPAGE, {
    variables: { token },
    // pollInterval: 5000,
  });

  useEffect(() => {
    if (error) {
      if (error.message === 'activate_email') {
        router.push('/verificate');
      } else {
        Cookies.set('token', '');
        Cookies.set('user', '');
        router?.push('/');
      }
    }
  }, []);

  const popularPosts = [];
  const otherPosts = [];

  data?.getHomepage.map((post) => {
    if ((post.likesInfo.likesRate >= 3 || post.commentsInfo.count > 10)
    && popularPosts.length <= 1) {
      popularPosts.push(post);
    } else {
      otherPosts.push(post);
    }
    return '';
  });

  return (
    <Layout>
      {
       data ? [...popularPosts, ...otherPosts].map((post) => (
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
         />
       ))
         : (
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

// data ? data.getHomepage.map((post) => (
//   <Post
//     key={post._id}
//     id={post._id}
//     username={post.user?.username}
//     // createdAt={post.createdAt}
//     content={post.content}
//     createdAt={post.createdAt}
//     likesInfo={post.likesInfo}
//     // today={today}
//     commentsCount={post.commentsInfo?.count}
//     truncate
//   />
// ))
