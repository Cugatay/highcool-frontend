import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import styles from '../../styles/components/ui/TopBar.module.scss';
import Button from './Button';

export default function TopBar({ hideFirst }) {
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;
  let prevScrollPos = 0;
  const [isVisible, setIsVisible] = useState(!hideFirst);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;

    prevScrollPos = currentScrollPos;
    setIsVisible(visible);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.topBar, !isVisible && styles.hidden)}>
        <a href="/home">Coarrel</a>
        {user
        && <Link href={`/user?u=${user.username}`}><Button className={clsx(styles.avatar, 'avatar')}>{user.username[0].toUpperCase()}</Button></Link>}
      </div>
    </div>
  );
}
