import clsx from 'clsx';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/components/LandingHeader.module.scss';
import Button from './ui/Button';

export default function LandingHeader({
  loginFunc, registerFunc, selectOne, className,
}) {
  const [isDisabled, setIsDisabled] = useState(selectOne || 'register');

  const toggleLogin = () => {
    if (loginFunc) {
      loginFunc();
    }

    if (isDisabled) {
      setIsDisabled('login');
    }
  };
  const toggleRegister = () => {
    if (registerFunc) {
      registerFunc();
    }

    if (isDisabled) {
      setIsDisabled('register');
    }
  };
  return (
    <div className={clsx(styles.container, className)}>
      <h1>COARREL</h1>
      <div className={styles.buttonsContainer}>
        <Link href="/sign?t=in">
          <Button
            onClick={toggleLogin}
            className={clsx(styles.button, isDisabled === 'login' && styles.register)}
          >
            Giriş Yap
          </Button>
        </Link>

        <Link href="/sign?t=up">
          <Button
            onClick={toggleRegister}
            className={clsx(styles.button, isDisabled === 'register' && styles.register)}
          >
            Kayıt Ol
          </Button>
        </Link>
      </div>
    </div>
  );
}
