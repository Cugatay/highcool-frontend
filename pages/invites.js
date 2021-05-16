import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import IncomingInvite from '../components/IncomingInvite';
import Layout from '../components/layout/DefaultLayout';
import Post from '../components/Post';
import styles from '../styles/pages/Invites.module.scss';
import AcceptedInvite from '../components/AcceptedInvite';
import PostSkeleton from '../components/skeleton/PostSkeleton';
import Message from '../components/ui/Message';

const GET_INVITES_PAGE = gql`
query Invites($token: String!){
  invites(token: $token) {
    accepted_new {
      receiver {
        nameSurname
        username
      }
      post {
        content
      }
    }
    incoming {
      _id
      post {
        content
      }
      sender {
        nameSurname
      }
      content
    }
    accepted_old {
      receiver {
        nameSurname
        username
      }
      post {
        content
      }
    }
    sent {
      post {
        _id
        content
        createdAt
        likesInfo {
          likesRate
          isLiked
        } 
        commentsInfo {
          count
        }
      }
    }
  }
}
`;

// accepted_new, incoming, accepted_old, sent

export default function Invites() {
  const token = Cookies.get('token');
  const { data: comingData } = useQuery(GET_INVITES_PAGE, { variables: { token } });
  const [data, setData] = useState(comingData);

  const [message, setMessage] = useState({ message: null, isError: false });

  useEffect(() => {
    setData(comingData);
  }, [comingData]);

  return (
    <Layout className={styles.container}>
      {message?.message
      && (
      <Message
        message={message.message}
        clearMessage={() => setMessage({ ...message, message: null })}
        isError={message.isError}
      />
      )}
      {data
        ? (
          <>
            {!data.invites.accepted_new?.length && !data.invites.incoming?.length
            && !data.invites.accepted_old?.length && !data.invites.sent?.length
              ? <div className={styles.noInvite}>Henüz bir davetiyeniz bulunmamakta</div> : null}
            {data.invites.accepted_new.length
              ? (
                <div className={styles.newInvites}>
                  {/* <h2>Yeni Kabul Edilen Postlar</h2> */}
                  {data.invites.accepted_new.map((acceptedNewInvite) => (
                    <AcceptedInvite
                      newInvite
                      nameSurname={acceptedNewInvite.receiver.nameSurname}
                      username={acceptedNewInvite.receiver.username}
                      content={acceptedNewInvite.post.content}
                    />
                  ))}
                </div>
              ) : null}

            {data.invites.incoming.length
              ? (
                <div className={styles.incomingInvites}>
                  {/* <h2>Gelen İstekler</h2> */}
                  {data.invites.incoming.map((incomingInvite) => (
                    <IncomingInvite
                      token={token}
                      id={incomingInvite._id}
                      postContent={incomingInvite.post.content}
                      senderName={incomingInvite.sender.nameSurname}
                      inviteMessage={incomingInvite.content}
                      data={data}
                      setData={setData}
                      setMessage={setMessage}
                    />
                  ))}
                </div>
              ) : null}

            {data.invites.accepted_old.length
              ? (
                <div className={styles.oldInvites}>
                  {/* <h2>Kabul Edilmiş Postlar</h2> */}
                  {data.invites.accepted_old.map((acceptedOldInvite) => (
                    <AcceptedInvite
                      nameSurname={acceptedOldInvite.receiver.nameSurname}
                      username={acceptedOldInvite.receiver.username}
                      content={acceptedOldInvite.post.content}
                    />
                  ))}
                </div>
              ) : null}

            {data.invites.sent.length
              ? (
                <div className={styles.sentInvites}>
                  {/* <h2>İstek Atılan Postlar</h2> */}
                  {data.invites.sent.map(({ post }) => (
                    <div
                      className={styles.post}
                    >
                      <Post
                      // nameSurname={post.user?.nameSurname}
                      // username={post.user?.username}
                        tagless
                        id={post._id}
                        content={post.content}
                        createdAt={post.createdAt}
                        likesInfo={{ likesRate: 15, isLiked: false }}
                        commentsCount={3}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
          </>
        ) : (
          <div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

    </Layout>
  );
}
