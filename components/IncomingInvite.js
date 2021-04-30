import clsx from 'clsx';
import React from 'react';
import styles from '../styles/components/IncomingInvite.module.scss';
import Post from './Post';
import Button from './ui/Button';

export default function IncomingInvite() {
  return (
    <div className={styles.container}>

      {/* <div className={styles.toPost}>Şu Posta:</div> */}

      <div className={styles.post}>
        <Post
          nameSurname="Cagatay Kaydir"
          username="cagatayxx"
          content="cok guzel bi post yapmisim he"
          likesInfo={{ likesRate: 15, isLiked: false }}
          commentsCount={3}
          tagless
        />
      </div>

      <div className={styles.invite}>
        <div className={styles.top}>
          <div className={styles.user}>
            <div className={clsx('avatar', styles.avatar)}>C</div>
            <div className={styles.info}>
              <p className={styles.nameSurname}>
                {/* {nameSurname || '??'} */}
                Cagatay Kaydir
              </p>
              <p className={styles.username}>
                @
                {/* {username} */}
                cagatayxx
              </p>
            </div>
          </div>

          <div className={styles.acceptOrDecline}>
            <Button><img src="/icons/decline.svg" alt="Decline" /></Button>
            <Button><img src="/icons/accept.svg" alt="Accept" /></Button>
          </div>
        </div>

        <div className={styles.content}>
          Selam, çok güzel bir post olmuş!
        </div>

      </div>
    </div>
  );
}
/* onClick={pushUserpage} */
