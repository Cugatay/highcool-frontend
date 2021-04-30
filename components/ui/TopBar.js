import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import styles from '../../styles/components/ui/TopBar.module.scss';
import Button from './Button';

export default function TopBar() {
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <a href="/home">HIGHCOOL</a>
        {user
        && <Link href={`/user/${user.username}`}><Button className={clsx(styles.avatar, 'avatar')}>{user.username[0].toUpperCase()}</Button></Link>}
      </div>
    </div>
  );
}
