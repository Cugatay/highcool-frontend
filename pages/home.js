import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  const { queryPostId } = router.query;
  const [queryPost, setQueryPost] = useState(null);

  const [sliceNumber, setSliceNumber] = useState(10);

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
    const scrollListener = () => {
      const limit = document.body.offsetHeight - window.innerHeight;
      if (limit - window.scrollY < 700 && sliceNumber <= data.getHomepage.length) {
        setSliceNumber(sliceNumber + 10);
      }
    };

    if (data) {
      window.addEventListener('scroll', scrollListener);
    }

    if (data && queryPostId) {
      setQueryPost(data.getHomepage.find((post) => post._id === queryPostId));
    }
  }, [data, queryPostId]);

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
        queryPost

         && (
         <Post
           id={queryPost._id}
           username={queryPost.user?.username}
          // createdAt={post.createdAt}
           content={queryPost.content}
           createdAt={queryPost.createdAt}
           likesInfo={queryPost.likesInfo}
          // today={today}
           commentsCount={queryPost.commentsInfo?.count}
         />
         )
      }

      {
       data ? [...popularPosts, ...otherPosts].slice(0, sliceNumber).map((post) => (
         post._id !== queryPostId ? (
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
         ) : null
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
