import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import styles from '../../styles/components/ui/MessageInput.module.scss';
import Button from './Button';
import ApolloClient from '../../apollo-client';

export default function MessageInput({
  postId, newMessages, setNewMessage,
}) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isContained, setIsContained] = useState(false);
  const messageRef = useRef(null);
  const token = Cookies.get('token');

  const toggleSetIsLocked = () => {
    setIsPrivate(!isPrivate);
    messageRef.current.focus();
  };

  const toggleSend = async () => {
    const COMMENT_POST = gql`
      mutation CommentPost($token: String! $post_id: ID! $content: String! $isPrivate: Boolean) {
        commentPost(token: $token post_id: $post_id content: $content isPrivate: $isPrivate) {
          message
        }
      } 
    `;
    const content = messageRef.current.value;

    setNewMessage([...newMessages, { user: !isPrivate, content: messageRef?.current.value }]);
    messageRef.current.value = null;
    messageRef.current.focus();
    setIsContained(false);
    setTimeout(() => {
      window?.scrollTo(0, document?.body?.scrollHeight);
    }, 100);

    await ApolloClient.mutate({
      mutation: COMMENT_POST,
      variables: {
        token, post_id: postId, content, isPrivate,
      },
    });
  };

  useEffect(() => {
    const listenerFunction = () => {
      const limit = document.body.offsetHeight - window.innerHeight;
      if (limit - window.scrollY < 300) {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 200);
      }
    };
    messageRef.current.addEventListener('focus', listenerFunction);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button
          onClick={toggleSetIsLocked}
          className={clsx(styles.lock, isPrivate && styles.locked)}
        >
          <img src={`/icons/lock${!isPrivate ? '_open' : ''}.svg`} alt="lock" />
        </Button>
        <input
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !!e.target.value && e.target.value[0] !== ' ') {
              toggleSend();
            }
          }}
          ref={messageRef}
          onChange={(e) => {
            if (e.target.value[0] !== ' ') {
              setIsContained(!!e.target.value);
            }
          }}
          type="text"
          placeholder="Bir şeyler söyle"
        />
        <Button
          onClick={toggleSend}
          className={clsx(styles.send, !!isContained && styles.sendContained)}
        >
          <img src="/icons/send.svg" alt="send" />
        </Button>
      </div>
    </div>
  );
}
