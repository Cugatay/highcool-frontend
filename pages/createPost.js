import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import styles from '../styles/pages/CreatePost.module.scss';
import Button from '../components/ui/Button';
import TopBar from '../components/ui/TopBar';
import ApolloClient from '../apollo-client';

// const GET_HOMEPAGE = gql`
const CREATE_POST = gql`
  mutation CreatePost($token: String! $content: String! $isPrivate: Boolean) {
    createPost(token: $token content: $content isPrivate: $isPrivate) {
      post_id
    }
  }
`;

export default function CreatePost() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isContained, setIsContained] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef(null);
  const token = Cookies.get('token');

  const router = useRouter();

  const toggleSetIsLocked = () => {
    setIsPrivate(!isPrivate);
    textAreaRef.current.focus();
  };

  const toggleCreatePost = async () => {
    try {
      setIsLoading(true);
      const { data } = await ApolloClient.mutate({
        mutation: CREATE_POST,
        variables: { token, content: textAreaRef.current.value, isPrivate },
      });

      router.push(`/post/${data.createPost.post_id}`);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.textContent}>
        <TextareaAutosize
          ref={textAreaRef}
          className={styles.textArea}
          minRows={4}
          maxRows={5}
          placeholder="Düşüncelerini Yaz..."
          onChange={(e) => {
            if (e.target.value[0] !== ' ' && e.target.value[0] !== '\n') {
              setIsContained(!!e.target.value);
            }
          }}
        />
        <div className={styles.bottom}>
          <Button
            onClick={toggleSetIsLocked}
            className={clsx(styles.lock, isPrivate && styles.locked)}
          >
            <img src={`/icons/lock${!isPrivate ? '_open' : ''}.svg`} alt="lock" />
          </Button>
          <Button
            loading={isLoading}
            className={clsx(styles.send, isContained && styles.contained)}
            disabled={!isContained}
            onClick={toggleCreatePost}
          >
            Gönder
          </Button>
        </div>
      </div>
    </div>
  );
}
