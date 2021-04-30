import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { gql, useQuery } from '@apollo/client';
import Button from './Button';
import styles from '../../styles/components/ui/Navbar.module.scss';

const NOTIFICATIONS_COUNT = gql`
  query NotificationsCount($token: String!) {
    notificationsCount(token: $token)
  }
`;

export default function Navbar() {
  const { pathname, push: routerPush } = useRouter();
  const token = Cookies.get('token');
  const { data, error } = useQuery(NOTIFICATIONS_COUNT, { variables: { token } });

  useEffect(() => {
    if (error) {
      routerPush('/');
      Cookies.set('user', '');
      Cookies.set('token', '');
    }
  }, [error]);
  console.log(data?.notificationsCount === 0);

  return (
    <div className={styles.container}>
      <a href="/home">
        <Button className={clsx(styles.button, pathname === '/home' && styles.active)}>
          <img src="/icons/home.svg" alt="home" />
        </Button>
      </a>
      <Link href="/createPost">
        <Button className={styles.addButton}>
          <img src="/icons/add.svg" alt="add" />
        </Button>
      </Link>
      <a href="/invites">
        <Button className={clsx(styles.button, styles.invites, pathname === '/invites' && styles.active)}>
          <img src="/icons/person_search.svg" alt="invites" />
          {data?.notificationsCount && pathname !== '/invites'
            ? <div className={styles.notifications}>{data?.notificationsCount < 10 ? data?.notificationsCount : '+9'}</div> : null}
        </Button>
      </a>
    </div>
  );
}
