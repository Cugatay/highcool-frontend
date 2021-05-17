/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import styles from '../styles/pages/Verificate.module.scss';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ApolloClient from '../apollo-client';
import Message from '../components/ui/Message';

const RESEND_EMAIL = gql`
  mutation ResendEmail($token: String!) {
    resendEmail(token: $token) {
      message
    }
  }
`;

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String! $code: String!){
    verifyEmail(token: $token code: $code){
      message
    }
  }
`;

export default function Verificate() {
  const router = useRouter();
  const token = Cookies.get('token');

  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: null, isError: false });
  const codeRef = useRef(null);

  useEffect(() => {
    if (!token) {
      Cookies.set('user', '');
      router.push('/');
    }
  }, []);

  const resendEmail = async () => {
    try {
      await ApolloClient.mutate({ mutation: RESEND_EMAIL, variables: { token } });
      setMessage({ message: 'İşleminiz Başarılı', isError: false });
    } catch (e) {
      setMessage({ message: e.message, isError: true });
    }
  };

  const exit = () => {
    Cookies.set('token', '');
    Cookies.set('user', '');

    router.push('/');
  };

  const handleVerificate = async () => {
    setLoading(true);
    try {
      await ApolloClient.mutate({
        mutation: VERIFY_EMAIL,
        variables: { token, code: codeRef.current.value },
      });
      setMessage({ message: 'Ana Sayfaya Yönlendiriliyorsunuz', isError: false });
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (e) {
      setMessage({ message: e.message, isError: true });
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {message?.message
      && (
      <Message
        message={message.message}
        clearMessage={() => setMessage({ ...message, message: null })}
        isError={message.isError}
      />
      )}
      <div className={styles.title}>
        <h1>E-Postanı Doğrula</h1>
        <h4>
          Sana özel bir e-posta aracılığıyla çok önemli
          bir kod gönderdik. Gizli dünyaların kapısını aralayacak bu kodu aşağıya girebilirsin
          <span onClick={resendEmail} className={styles.resend}>Tekrar Gönder</span>
          <span onClick={exit} className={styles.exit}>Çıkış Yap</span>
        </h4>
      </div>

      <Input
        forwardRef={codeRef}
        onChange={(e) => {
          setIsFilled(!!e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !!e.target.value) {
            handleVerificate();
          }
        }}
        className={styles.input}
      />

      <Button
        disabled={!isFilled}
        onClick={handleVerificate}
        className={clsx(styles.button, isFilled && styles.filledButton)}
        loading={loading}
      >
        Doğrula
      </Button>
    </div>
  );
}
