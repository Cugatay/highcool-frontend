import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import styles from '../../styles/components/ui/MessageInput.module.scss';
import Button from './Button';
import ApolloClient from '../../apollo-client';

export default function MessageInput({
  postId, newMessages, setNewMessages, usersMessages, setUsersMessages,
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
          comment_id
        }
      } 
    `;
    const content = messageRef.current.value;

    setNewMessages([...newMessages, {
      user: !isPrivate,
      content: messageRef?.current.value,
    }]);

    messageRef.current.value = null;
    messageRef.current.focus();
    setIsContained(false);
    setTimeout(() => {
      window?.scrollTo(0, document?.body?.scrollHeight);
    }, 100);

    const { data } = await ApolloClient.mutate({
      mutation: COMMENT_POST,
      variables: {
        token, post_id: postId, content, isPrivate,
      },
    });
    setNewMessages([...newMessages.slice(0, newMessages.length - 1), {
      _id: data.commentPost.comment_id,
      user: !isPrivate,
      content,
    }]);
    if (isPrivate) {
      setUsersMessages([...usersMessages, data.commentPost.comment_id]);
    }
  };

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
