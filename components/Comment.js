import clsx from 'clsx';
import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '../styles/components/Comment.module.scss';
import Button from './ui/Button';

export default function Comment({ username, nameSurname, content }) {
  const router = useRouter();
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  const pushUserpage = () => {
    if (username) {
      router.push(`/user/${username}`);
    }
  };

  return (
    <div className={clsx(styles.container, user?.username === username && styles.primary)}>
      <div className={styles.top}>
        <Button onClick={pushUserpage} className={clsx('avatar', styles.avatar)}>{nameSurname ? nameSurname[0]?.toUpperCase() : '?'}</Button>
        <div className={styles.user}>
          <span className={styles.nameSurname}>
            {nameSurname || '??'}
          </span>
          <span className={styles.username}>
            @
            {username}
          </span>
        </div>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
