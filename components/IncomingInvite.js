import clsx from 'clsx';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { gql } from '@apollo/client';
import styles from '../styles/components/IncomingInvite.module.scss';
import Button from './ui/Button';
import ApolloClient from '../apollo-client';

const ACCEPT_OR_DECLINE = gql`
  mutation AcceptOrDeclineInvite($token: String! $invite_id: ID! $isAccepted: Boolean!){
    acceptOrDeclineInvite(token: $token invite_id: $invite_id isAccepted: $isAccepted) {
      message
    }
  }
`;

export default function IncomingInvite({
  id, postContent, senderName, inviteMessage, token, data, setData, setMessage,
}) {
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptOrDecline = async (isAccepted) => {
    setIsLoading(true);
    try {
      await ApolloClient.mutate({
        mutation: ACCEPT_OR_DECLINE, variables: { token, invite_id: id, isAccepted },
      });

      const newIncoming = data.invites.incoming.filter((invite) => invite._id !== id);
      setData({ invites: { ...data.invites, incoming: newIncoming } });
      setMessage({ message: 'İşleminiz Başarıyla Gerçekleştirildi', isError: false });
    } catch (e) {
      setMessage({ message: 'Bir şeyler ters gitti', isError: true });
    }
    setIsLoading(false);
  };

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
            <Button onClick={() => handleAcceptOrDecline(false)} loading={isLoading}><img src="/icons/decline.svg" alt="Decline" /></Button>
            <Button onClick={() => handleAcceptOrDecline(true)} loading={isLoading}><img src="/icons/accept.svg" alt="Accept" /></Button>
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
