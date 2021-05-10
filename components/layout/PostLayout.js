import clsx from 'clsx';
import React from 'react';
import styles from '../../styles/components/layout/PostLayout.module.scss';
import MessageInput from '../ui/MessageInput';
import TopBar from '../ui/TopBar';

export default function Layout({
  children, hideFirst, className, postId, newMessages, setNewMessages, usersMessages,
  setUsersMessages, ...props
}) {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      <TopBar hideFirst={hideFirst} />
      {children}
      <MessageInput
        postId={postId}
        newMessages={newMessages}
        setNewMessages={setNewMessages}
        usersMessages={usersMessages}
        setUsersMessages={setUsersMessages}
      />
    </div>
  );
}
