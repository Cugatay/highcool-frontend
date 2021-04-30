import clsx from 'clsx';
import React from 'react';
import styles from '../../styles/components/layout/PostLayout.module.scss';
import MessageInput from '../ui/MessageInput';
import TopBar from '../ui/TopBar';

export default function Layout({
  children, className, postId, newMessages, setNewMessage, ...props
}) {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      <TopBar />
      {children}
      <MessageInput postId={postId} newMessages={newMessages} setNewMessage={setNewMessage} />
    </div>
  );
}
