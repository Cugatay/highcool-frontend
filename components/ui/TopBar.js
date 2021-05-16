/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import styles from '../../styles/components/ui/TopBar.module.scss';
import Button from './Button';
import useIsMobile from '../../hooks/useIsMobile';

export default function TopBar({ hideFirst }) {
  const router = useRouter();

  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;
  let prevScrollPos = 0;
  const [isVisible, setIsVisible] = useState(!hideFirst);

  const isMobile = useIsMobile();

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;

    prevScrollPos = currentScrollPos;
    setIsVisible(visible);
  };

  const handlePushHome = () => {
    router.push('/home');
  };

  useEffect(() => {
    if (isMobile) {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      if (isMobile) {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.topBar, !isVisible && styles.hidden)}>
        <div onClick={handlePushHome} className={styles.left}>
          <img src="/favicon.png" alt="Icon" />
          <p>Prisold</p>
        </div>
        {user
        && <Link href={`/user?u=${user.username}`}><Button className={clsx(styles.avatar, 'avatar')}>{user.username[0].toUpperCase()}</Button></Link>}
      </div>
    </div>
  );
}
