import clsx from 'clsx';
import React from 'react';
import styles from '../../styles/components/layout/DefaultLayout.module.scss';
import Navbar from '../ui/Navbar';
import TopBar from '../ui/TopBar';

export default function Layout({ children, className, ...props }) {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      <TopBar />
      <p>{typeof window !== 'undefined' && window.navigator.appname}</p>
      <p>{typeof window !== 'undefined' && window.navigator.appCodeName}</p>
      {children}
      <Navbar />
    </div>
  );
}
