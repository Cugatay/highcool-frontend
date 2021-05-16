/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from '../../styles/components/ui/Message.module.scss';
import errors from '../../backend-errors.json';

export default function Message({
  onlyTranslate, message, clearMessage, isError, timeout,
}) {
  const messageText = isError ? errors[message] || message : message;

  let timeOut;

  useEffect(() => {
    timeOut = setTimeout(() => {
      clearMessage();
    }, timeout || 3000);

    return () => clearTimeout(timeOut);
  }, [message]);

  if (onlyTranslate) {
    return messageText;
  }

  if (message) {
    return (
      <div onClick={clearMessage} className={styles.case}>
        <div className={clsx(styles.container, isError ? styles.error : styles.success)}>
          {messageText}
        </div>
      </div>
    );
  } return null;
}
