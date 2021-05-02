import React from 'react';
import clsx from 'clsx';
import styles from '../styles/components/AcceptedInvite.module.scss';
import Button from './ui/Button';

export default function AcceptedInvite({
  newInvite, nameSurname, username, content,
}) {
  return (
    <div className={clsx(styles.post, newInvite && styles.new)}>
      <div className={styles.head}>
        <div className={styles.user}>
          <Button
              // onClick={pushUserpage}
            className={clsx('avatar', styles.avatar)}
          >
            {nameSurname ? nameSurname[0]?.toUpperCase() : '?'}
          </Button>
          <div className={styles.info}>
            <p className={styles.nameSurname}>
              {nameSurname || '??'}
              {/* Cagatay Kaydir */}
            </p>
            <p className={styles.username}>
              @
              {username}
            </p>
          </div>
        </div>
        {/* User must be able to use our app with just one hand.
        And the position of invite button is don't let that. */}
      </div>

      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
}
