import clsx from 'clsx';
import React from 'react';
import Cookies from 'js-cookie';
import styles from '../styles/components/IncomingInvite.module.scss';
import Button from './ui/Button';

export default function IncomingInvite({
  id, postContent, senderName, inviteMessage,
}) {
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  return (
    <div className={styles.invite}>
      <div className={styles.head}>
        <div className={styles.user}>
          <div className={clsx('avatar', styles.avatar)}>{user.nameSurname ? user.nameSurname[0] : '?'}</div>
          <div className={styles.info}>
            <p className={styles.nameSurname}>
              {user.nameSurname}
            </p>
            <p className={styles.username}>
              @
              {user.username}
            </p>
          </div>
        </div>

      </div>

      <div className={styles.postContent}>
        {postContent}
      </div>

      <div className={styles.inviteContent}>
        <div className={styles.top}>
          <div className={styles.user}>
            <div className={clsx('avatar', styles.avatar)}>{senderName ? senderName[0] : '?'}</div>
            <div className={styles.nameSurname}>
              {senderName}
              :
            </div>
          </div>

          <div className={styles.acceptOrDecline}>
            <Button><img src="/icons/decline.svg" alt="Decline" /></Button>
            <Button><img src="/icons/accept.svg" alt="Accept" /></Button>
          </div>
        </div>
        <span className={styles.content}>
          {inviteMessage}
        </span>
      </div>
    </div>
  );
}
/* onClick={pushUserpage} */
