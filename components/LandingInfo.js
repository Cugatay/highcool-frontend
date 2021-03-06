import React, { useState } from 'react';
import Button from './ui/Button';
import styles from '../styles/pages/Sss.module.scss';

export default function LandingInfo({
  title, info, hiddenInfo, github,
}) {
  const [isShowing, setIsShowing] = useState(false);

  const regex = / /g; // Note the 'g' flag, which matches all occurrences of the expression

  const titleId = title.replace(regex, '-');

  return (
    <div id={titleId} className={styles.card}>
      <h3>{title}</h3>

      <p>{info}</p>
      {
            isShowing ? (
              <>
                <p>{hiddenInfo}</p>
                {
                    github
                    && (
                    <div className={styles.github}>
                      <span>Sitenin Kodları: </span>
                      <a href="https://github.com/Cugatay/highcool-backend" target="_blank" rel="noreferrer">https://github.com/Cugatay/highcool-backend</a>
                    </div>
                    )
                }
              </>
            )
              : hiddenInfo && (
                <Button
                  className={styles.moreButton}
                  onClick={() => setIsShowing(true)}
                >
                  Devamını Oku
                  {' '}
                  <img src="/icons/expand_more.svg" alt="Daha Fazla" />
                </Button>
              )
        }
    </div>
  );
}
