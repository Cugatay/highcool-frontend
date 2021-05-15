import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import Layout from '../components/layout/DefaultLayout';
import styles from '../styles/pages/User.module.scss';
import Button from '../components/ui/Button';
import Post from '../components/Post';
import PostSkeleton from '../components/skeleton/PostSkeleton';
import UserpageTopSkeleton from '../components/skeleton/UserpageTopSkeleton';
import ApolloClient from '../apollo-client';

const GET_USERPAGE = gql`
    query User($token: String! $username: String!) {
      user(token: $token username: $username) {
        nameSurname
        username
        followers {
          username
        }
        posts {
          _id
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
    } 
  `;

const TOGGLE_FOLLOW = gql`
      mutation FollowUserToggle($token: String! $target_username: String!) {
        followUserToggle(token: $token target_username: $target_username) {
          message
        }
      }
    `;

export default function UserPage() {
  const router = useRouter();
  const { u: dynamicUsername } = router.query;
  const token = Cookies.get('token');
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  const { data, error } = useQuery(GET_USERPAGE,
    { variables: { token, username: dynamicUsername } });

  const [isUserFollowing, setIsUserFollowing] = useState(null);
  const [followingCount, setFollowingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const buttonType = data?.user.username === user?.username ? 'exit' : isUserFollowing ? 'stop_following' : 'follow';

  useEffect(() => {
    if (dynamicUsername) {
      if (error) {
        if (error.message === 'user_not_found') {
          router.push('/home');
        } else {
          Cookies.set('token', '');
          Cookies.set('user', '');
          router.push('/');
        }
      }
    }
  }, [error]);

  useEffect(() => {
    setIsUserFollowing(data?.user?.followers?.find(
      (follower) => follower.username === user?.username,
      setFollowingCount(data?.user?.followers?.length),
    ));
  }, [data]);

  const toggleButtonFunction = async () => {
    if (buttonType === 'exit') {
      Cookies.set('token', '');
      Cookies.set('user', '');
      router.push('/');
    } else {
      setIsLoading(true);
      await ApolloClient.mutate({
        mutation: TOGGLE_FOLLOW, variables: { token, target_username: dynamicUsername },
      });
      setIsLoading(false);
      setIsUserFollowing(!isUserFollowing);
      if (!isUserFollowing) {
        setFollowingCount(followingCount + 1);
      } else {
        setFollowingCount(followingCount - 1);
      }
    }
  };

  return (
    <Layout className={styles.content}>
      {data?.user
        ? (
          <>
            <div className={styles.top}>
              <div className={clsx('avatar', styles.avatar)}>{data?.user?.nameSurname[0].toUpperCase()}</div>
              <p className={styles.username}>
                @
                {data?.user?.username}
              </p>
              <p className={styles.nameSurname}>{data?.user?.nameSurname}</p>
              <Button
                loading={isLoading}
                onClick={toggleButtonFunction}
                className={clsx(styles.button, styles[buttonType])}
              >
                {
                  buttonType === 'exit' ? 'Çıkış Yap' : buttonType === 'follow' ? 'Takip Et' : 'Takibi Bırak'
                }
              </Button>
              {
                followingCount > 0
                && (
                <p className={styles.followersCount}>
                  {`${followingCount} `}
                  takipçi
                </p>
                )
              }
            </div>

            <div className={styles.posts}>
              <h2 className={styles.title}>Geçmiş Postlar</h2>
              <div className={styles.content}>
                {
                data?.user?.posts?.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    nameSurname={data?.user?.nameSurname}
                    username={data?.user?.username}
                  // createdAt={post.createdAt}
                    content={post.content}
                    createdAt={post.createdAt}
                    likesInfo={post.likesInfo}
                  // today={today}
                    commentsCount={post.commentsInfo?.count}
                  />
                ))
              }
              </div>
            </div>
          </>
        )
        : (
          <>
            <UserpageTopSkeleton />
            <PostSkeleton />
          </>
        )}

    </Layout>
  );
}
