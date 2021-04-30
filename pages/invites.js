import React from 'react';
import IncomingInvite from '../components/IncomingInvite';
import Layout from '../components/layout/DefaultLayout';
import Post from '../components/Post';
import styles from '../styles/pages/Invites.module.scss';

export default function Invites() {
  return (
    <Layout className={styles.container}>
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
      <IncomingInvite />
    </Layout>
  );
}
