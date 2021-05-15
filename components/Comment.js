/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import TimeAgo from 'react-timeago';
import turkishStrings from 'react-timeago/lib/language-strings/tr';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import styles from '../styles/components/Comment.module.scss';
import Button from './ui/Button';

export default function Comment({
  username, nameSurname, content, createdAt,
}) {
  const router = useRouter();
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  const pushUserpage = () => {
    if (username) {
      router.push(`/user?u=${username}`);
    }
  };

  const timeAgoFormatter = buildFormatter(turkishStrings);

  return (
    <div className={user?.username === username && styles.primary}>
      {
        user?.username === username
        && <div className={styles.provider} />
      }

      <div className={styles.case}>
        <div className={clsx(styles.container)}>
          <Button onClick={pushUserpage} className={clsx('avatar', styles.avatar, user?.username !== username && styles.others, !username && styles.secret)}>{nameSurname ? nameSurname[0]?.toUpperCase() : <img src="/icons/lock.svg" alt="Gizli" />}</Button>

          <div className={styles.right}>
            <div className={styles.user}>
              {username !== user.username
              && (
              <span onClick={pushUserpage} className={styles.nameSurname}>
                {nameSurname || 'Gizli'}
              </span>
              )}
            </div>
            <div className={styles.content}>{content}</div>
          </div>
        </div>

        <span>
          <TimeAgo date={createdAt} formatter={timeAgoFormatter} />
        </span>
      </div>
    </div>
  );
}
