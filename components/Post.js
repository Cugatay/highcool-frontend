/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import TimeAgo from 'react-timeago';
import turkishStrings from 'react-timeago/lib/language-strings/tr';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import styles from '../styles/components/Post.module.scss';
import Button from './ui/Button';
import ApolloClient from '../apollo-client';
import Message from './ui/Message';

const TOGGLE_LIKE = gql`
  mutation VotePost($token: String!, $object_id: ID!, $isLiked: Boolean!) {
    votePostOrCommentToggle(token: $token object_id: $object_id isLiked: $isLiked) {
      message
    }
  }
`;

const LEARN_POST_OWNER = gql`
  mutation learnPostOwner($token: String! $post_id: ID! $content: String!) {
    learnPostOwner(token: $token post_id: $post_id content: $content){
      message
    }
  }
`;

export default function Post({
  id, nameSurname, username, // createdAt,
  content, likesInfo, commentsCount, tagless, createdAt, // , today,
}) {
  const router = useRouter();

  const timeAgoFormatter = buildFormatter(turkishStrings);

  const token = Cookies.get('token');

  const inviteRef = useRef(null);

  const [isInviteContentVisible, setIsInviteContentVisible] = useState(false);
  const [isInviteButtonLoading, setIsInviteButtonLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(likesInfo.isLiked);
  const [message, setMessage] = useState({ message: null, isError: false });

  let likesRate = isLiked ? likesInfo.likesRate + 1
    : isLiked === false ? likesInfo.likesRate - 1 : likesInfo.likesRate;
  if (likesInfo.isLiked) {
    likesRate -= 1;
  } else if (likesInfo.isLiked === false) {
    likesRate += 1;
  }

  const handleLocate = () => {
    const location = `/post?p=${id}`;

    if (process.env.NEXT_PUBLIC_PRODUCTION) {
      window.location = location;
    } else {
      router.push(location);
    }
  };
  const toggleLike = async (newStatus) => {
    const currentIsLiked = isLiked === newStatus ? null : newStatus;
    setIsLiked(currentIsLiked);

    await ApolloClient.mutate({
      mutation: TOGGLE_LIKE, variables: { token, object_id: id, isLiked: newStatus },
    }).then(() => {

    });
  };

  const pushUserpage = () => {
    if (username) {
      router.push(`/user?u=${username}`);
    }
  };

  const sendInvite = async () => {
    try {
      setIsInviteButtonLoading(true);

      await ApolloClient.mutate({
        mutation: LEARN_POST_OWNER,
        variables: {
          token,
          post_id: id,
          content: inviteRef.current.value[0] !== ' ' ? inviteRef.current.value || 'Çok güzel bir post olmuş!' : 'Çok güzel bir post olmuş!',
        },
      });

      setIsInviteButtonLoading('success');
      setIsInviteContentVisible(false);
    } catch (e) {
      setIsInviteButtonLoading(false);
      setIsInviteContentVisible(false);
      if (e.message === 'sender_and_receiver_cannot_be_same_account') {
        setMessage({ message: 'Bu post zaten size ait', isError: true });
      } else if (e.message === 'user_already_accepted_your_invite') {
        setMessage({ message: 'Bu postun sahibi zaten isteğinizi kabul etti!', isError: true });
      } else {
        setMessage({ message: 'Bir şeyler ters gitti', isError: true });
      }
    }
  };

  return (
    <div
      className={clsx(styles.post,
        !tagless && (likesRate > 3 || commentsCount > 10) && styles.tagful)}
    >
      {message?.message
      && (
      <Message
        message={message.message}
        clearMessage={() => setMessage({ ...message, message: null })}
        isError={message.isError}
      />
      )}

      <div className={styles.head}>
        <div className={styles.user}>
          <Button
            onClick={pushUserpage}
            className={clsx('avatar', styles.avatar)}
          >
            {nameSurname ? nameSurname[0]?.toUpperCase() : '?'}
          </Button>
          <div className={styles.info}>
            <p onClick={pushUserpage} className={styles.nameSurname}>
              {nameSurname || '??'}
            </p>
            <p onClick={pushUserpage} className={styles.username}>
              @
              {username}
            </p>
          </div>
        </div>
        {/* User must be able to use our app with just one hand.
        And the position of invite button is don't let that. */}
        <div className={styles.right}>
          <span><TimeAgo date={createdAt} formatter={timeAgoFormatter} /></span>
          {
            !username && id
            && (
            <Button
              onClick={() => setIsInviteContentVisible(!isInviteContentVisible)}
              className={styles.invite}
            >
              <img src="/icons/person_search.svg" alt="invite" />
            </Button>
            )
          }
        </div>
      </div>

      <div className={styles.tags}>
        {
        likesRate > 3 && !tagless
        && (
        <div className={clsx(styles.tag, styles.admired)}>
          <img src="/icons/admired.svg" alt="begenilen" />
          <span>Çok Beğenilen</span>
        </div>
        )
      }
        {
        commentsCount > 10
        && (
        <div className={clsx(styles.tag, styles.discussed)}>
          <img src="/icons/discussed.svg" alt="begenilen" />
          <span>Çok Tartışılan</span>
        </div>
        )
      }
      </div>

      <div className={styles.content}>
        {content}
      </div>

      <div className={styles.likesAndComments}>
        <div className={clsx(styles.likes)}>
          <Button
            onClick={() => toggleLike(true)}
            className={clsx(styles.button, styles.like, isLiked && styles.active)}
          >
            <img src="/icons/like.svg" alt="begen" />
          </Button>
          <span>{likesRate}</span>
          <Button
            onClick={() => toggleLike(false)}
            className={clsx(styles.button, styles.dislike, isLiked === false && styles.active)}
          >
            <img src="/icons/dislike.svg" alt="begenme" />
          </Button>
        </div>

        {/* <a href={`/post?p=${id}`}> */}
        <Button onClick={handleLocate} className={styles.comments}>
          <img src="/icons/comment.svg" alt="comment" />
          <span>{commentsCount}</span>
        </Button>
        {/* </a> */}
      </div>
      {
        !username
        && (
        <div className={
                clsx(styles.inviteContent, !isInviteContentVisible && styles.inviteContentDisabled)
                }
        >
          {isInviteContentVisible
              && (
              <>
                <input
                  ref={inviteRef}
                  // placeholder="Mesajını Yaz.."
                  placeholder="Çok güzel bir post olmuş!"
                />
                {/* Acaba boş bırakılabilse mi ki? Eğer boşsa belli bi mesaj göndersin */}
                <Button loading={isInviteButtonLoading && isInviteButtonLoading !== 'success'} success={isInviteButtonLoading === 'success'} onClick={sendInvite} className={clsx(styles.sendInvite)}><img src="/icons/send.svg" alt="send" /></Button>
              </>
              )}
        </div>
        )
      }

    </div>
  );
}

// const findDate = () => {
//   if (createdAtDate.getFullYear() === today.getFullYear()) {
//     if (createdAtDate.getMonth() + 1 === today.getMonth() + 1) {
//       if (createdAtDate.getDate() === today.getDate()) {
//         return ('Bugün');
//       }
//       return (today.getDate() - createdAt.getDate(), 'gün önce');
//     }
//     return (today.getMonth() + 1 - createdAt.getMonth() - 1, 'ay önce');
//   }

//   const yearsAgo = today.getFullYear() - createdAt.getFullYear();
//   if (yearsAgo > 0) {
//     return (yearsAgo, 'yıl önce');
//   }
//   return 'invalid';
// };
