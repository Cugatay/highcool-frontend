import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import IncomingInvite from '../components/IncomingInvite';
import Layout from '../components/layout/DefaultLayout';
import Post from '../components/Post';
import styles from '../styles/pages/Invites.module.scss';
import AcceptedInvite from '../components/AcceptedInvite';

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

export default function Invites() {
  const token = Cookies.get('token');
  const { data } = useQuery(GET_INVITES_PAGE, { variables: { token } });
  console.log(data);

  return (
    <Layout className={styles.container}>
      {data
        ? (
          <>
            {data.invites.accepted_new.length
              ? (
                <div className={styles.newInvites}>
                  <h2>Yeni Kabul Edilen Postlar</h2>
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
                  <h2>Gelen İstekler</h2>
                  {data.invites.incoming.map((incomingInvite) => (
                    <IncomingInvite
                      id={incomingInvite._id}
                      postContent={incomingInvite.post.content}
                      senderName={incomingInvite.sender.nameSurname}
                      inviteMessage={incomingInvite.content}
                    />
                  ))}
                </div>
              ) : null}

            {data.invites.accepted_old.length
              ? (
                <div className={styles.oldInvites}>
                  <h2>Kabul Edilmiş Postlar</h2>
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
                  <h2>İstek Atılan Postlar</h2>
                  {data.invites.sent.map(({ post }) => (
                    <Post
                      // nameSurname={post.user?.nameSurname}
                      // username={post.user?.username}
                      tagless
                      content={post.content}
                      likesInfo={{ likesRate: 15, isLiked: false }}
                      commentsCount={3}
                    />
                  ))}
                </div>
              ) : null}
          </>
        ) : <div>Loading...</div>}

    </Layout>
  );
}
