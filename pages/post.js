import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Comment from '../components/Comment';
import PostSkeleton from '../components/skeleton/PostSkeleton';
import Layout from '../components/layout/PostLayout';
import Post from '../components/Post';
import CommentSkeleton from '../components/skeleton/CommentSkeleton';
import styles from '../styles/pages/Postpage.module.scss';

const GET_POST = gql`
    query Post($token: String! $post_id: ID!) {
        post(
        token: $token
        post_id: $post_id
        ) {
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
            comments {
            user {
                username
            }
            content
            createdAt
            likesInfo {
                likesRate
                isLiked
            }
            }
            count
        }
        }
    }
`;

export default function PostPage() {
  const router = useRouter();
  const { p: queryPostId } = router.query;
  const token = Cookies.get('token');
  const [render, setRender] = useState(false);
  const [newMessages, setNewMessage] = useState([]);
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const scrollToNewMessage = () => {
    const limit = document.body.offsetHeight - window.innerHeight;
    if (limit - window.scrollY < 300) {
      scrollToBottom();
    }
  };

  const { data, error } = useQuery(GET_POST,
    { variables: { token, post_id: queryPostId }, pollInterval: 2500 });

  useEffect(() => {
    if (queryPostId) {
      if (error && !user) {
        Cookies.set('token', '');
        Cookies.set('user', '');
        router?.push('/');
      } else if (error) {
        router.push('/home');
      }
    }
  }, [error]);

  useEffect(() => {
    if (data?.post /* && data?.post.commentsInfo.comments.length > 2 */ && typeof window !== 'undefined' && typeof document !== 'undefined') {
      setNewMessage([]);

      if (render === false) {
        scrollToBottom();
      }
      const lastComment = data.post.commentsInfo?.comments[data.post.commentsInfo?.count - 1];

      if (lastComment?.content !== newMessages?.content) {
        scrollToNewMessage();
      }
      setRender(true);
    }
  }, [data?.post?.commentsInfo]);

  return (
    <Layout hideFirst={data?.post.commentsInfo.comments?.length > 4} className={styles.content} style={{ overflow: 'hidden' }} postId={queryPostId} newMessages={newMessages} setNewMessage={setNewMessage}>
      {
          data?.post
            ? (
              <div>
                <Post
                  id={data.post._id}
                  username={data.post.user?.username}
                  content={data.post.content}
                  createdAt={data.post.createdAt}
                  likesInfo={data.post.likesInfo}
                  commentsCount={data.post.commentsInfo?.count}
                />
                {
                  data?.post?.commentsInfo?.comments.map((comment) => (
                    <Comment
                      username={comment.user?.username}
                      content={comment.content}
                      createdAt={comment.createdAt}
                    />
                  ))
                }

                {
                  data?.post.commentsInfo.comments.length === 0 && !newMessages
                && <p className={styles.noComment}>Hen??z Bir Yorum Yok. ??lk Yorumu Sen Yap!</p>
                }

                {newMessages.map((newMessage) => newMessage.content && (
                  <Comment
                    username={newMessage.user ? user.username : null}
                    content={newMessage.content}
                    // createdAt={newMessage.createdAt}
                  />
                ))}
              </div>
            )
            : (
              <div>
                <PostSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                {/* <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton /> */}
              </div>
            )
      }
    </Layout>
  );
}
