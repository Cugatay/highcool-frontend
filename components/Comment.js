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
      router.push(`/user?u=${username}`);
    }
  };

  return (
    <div className={clsx(styles.container, user?.username === username && styles.primary)}>
      <Button onClick={pushUserpage} className={clsx('avatar', styles.avatar, user?.username !== username && styles.others, !username && styles.secret)}>{nameSurname ? nameSurname[0]?.toUpperCase() : <img src="/icons/lock.svg" alt="Gizli" />}</Button>

      <div className={styles.right}>
        <div className={styles.user}>
          <span className={styles.nameSurname}>
            {nameSurname}
          </span>
          <span className={styles.username}>
            {
            username
              ? `@${username}` : 'Gizli'
            }
          </span>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
