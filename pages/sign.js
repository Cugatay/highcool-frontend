import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import styles from '../styles/pages/Login.module.scss';
import LandingHeader from '../components/LandingHeader';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ApolloClient from '../apollo-client';
import UserContext from '../context/UserContext';
import errors from '../backend-errors.json';

const LOGIN_MUTATION = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        username
      }
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export default function Login() {
  const { setUserValue } = useContext(UserContext);

  const router = useRouter();
  const { t: loggingType } = router.query;

  const [formError, setFormError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(loggingType === 'up');
  const [isLoading, setIsLoading] = useState(false);

  const usernameOrEmail = useRef(null);
  const password = useRef(null);
  const passwordRepeat = useRef(null);

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      router.push('/home');
    }
  }, []);

  const toggleLogin = async () => {
    try {
      if (isRegistering && passwordRepeat.current.value !== password.current.value) {
        setFormError('passwords_do_not_match');
        return;
      }

      setIsLoading(true);
      const { data } = await ApolloClient.mutate({
        mutation: isRegistering ? REGISTER_MUTATION : LOGIN_MUTATION,
        variables: isRegistering ? {
          username: usernameOrEmail.current.value,
          password: password.current.value,
        }
          : { usernameOrEmail: usernameOrEmail.current.value, password: password.current.value },
      });

      Cookies.set('token', data.register?.token || data.login?.token, { expires: 365 });
      Cookies.set('user', data.register ? JSON.stringify(data.register.user) : JSON.stringify(data.login.user), { expires: 365 });

      setUserValue({
        token: data.login?.token || data.register?.token,
        ...data.login?.user,
        ...data.register?.user,
      });

      router.push('/home');
    } catch (e) {
      setFormError(e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <LandingHeader
        loginFunc={() => { setIsRegistering(false); }}
        registerFunc={() => { setIsRegistering(true); }}
        selectOne={loggingType === 'up' ? 'register' : 'login'}
      />

      <div className={styles.inputContainer}>
        <Input
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !!e.target.value) {
              toggleLogin();
            }
          }}
          forwardRef={usernameOrEmail}
          className={styles.input}
          placeholder="Kullanıcı Adı"
        />

        <Input
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !!e.target.value) {
              toggleLogin();
            }
          }}
          forwardRef={password}
          className={styles.input}
          placeholder="Şifre"
          type="password"
          hideEyeIcon={isRegistering}
        />

        <div className={clsx(
          styles.registerSection,
          !isRegistering && styles.noneSection,
        )}
        >
          {isRegistering
          && (
          <>
            <Input
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !!e.target.value) {
                  toggleLogin();
                }
              }}
              forwardRef={passwordRepeat}
              className={styles.input}
              placeholder="Şifre Tekrar"
              type="password"
              hideEyeIcon
            />
          </>
          )}
        </div>

      </div>

      {formError
      && <p className={styles.error}>{errors[formError]}</p>}

      <Button
        onClick={toggleLogin}
        className={styles.button}
        loading={isLoading}
      >
        {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
      </Button>
    </div>
  );
}
