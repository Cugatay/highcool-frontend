import clsx from 'clsx';
import React from 'react';
import styles from '../styles/components/IncomingInvite.module.scss';
import Button from './ui/Button';

export default function IncomingInvite() {
  return (
    <div className={styles.invite}>
      <div className={styles.head}>
        <div className={styles.user}>
          <div className={clsx('avatar', styles.avatar)}>C</div>
          <div className={styles.info}>
            <p className={styles.nameSurname}>
              cagatayxx
            </p>
          </div>
        </div>

      </div>

      <div className={styles.postContent}>
        Selam, çok güzel bir post olmuş!
      </div>

      <div className={styles.inviteContent}>
        <div className={styles.top}>
          <div className={styles.user}>
            <div className={clsx('avatar', styles.avatar)}>C</div>
            <div className={styles.nameSurname}>Cagatay Kaydir:</div>
          </div>

          <div className={styles.acceptOrDecline}>
            <Button><img src="/icons/decline.svg" alt="Decline" /></Button>
            <Button><img src="/icons/accept.svg" alt="Accept" /></Button>
          </div>
        </div>
        <span className={styles.content} t>
          Selam, çok güzel bir post olmuş!
        </span>
      </div>
    </div>
  );
}
/* onClick={pushUserpage} */
