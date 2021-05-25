/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import styles from '../styles/pages/Sss.module.scss';

export default function LandingQList({ questions }) {
  const [selected, setSelected] = useState(questions[0]);
  const scrollableAreaRef = useRef(null);
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   scrollableAreaRef.current.addEventListener('scroll', () => {
  //     setIsScrolled(!!scrollableAreaRef.current.scrollLeft);
  //   });
  // }, []);

  return (
    <div className={styles.sss}>
      {/* <h2>S.S.S (Sık Sorulan Sorular)</h2> */}

      <div ref={scrollableAreaRef} className={styles.questions}>
        {questions.map((q) => (
          <a
            onClick={() => setSelected(q)}
            className={clsx(styles.question, selected === q && styles.selected)}
            href={`#${q.replaceAll(' ', '-')}`}
          >
            {q}
          </a>
        ))}
      </div>

      {/* {
          selected !== questions[1]
          && (
            <div className={styles.arrowContainer}>
              <div className={clsx(styles.arrow, isScrolled && styles.hidden)}>{'>'}</div>
            </div>
          )
        } */}
    </div>
  );
}
