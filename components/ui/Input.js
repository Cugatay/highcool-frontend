import clsx from 'clsx';
import React, { useState } from 'react';
import styles from '../../styles/components/ui/Input.module.scss';

export default function Input({
  type, className, forwardRef, hideEyeIcon, ...inputProps
}) {
  const [isVisible, setIsVisible] = useState(type !== 'password');

  return (
    <div className={clsx(styles.input, className)}>
      <input ref={forwardRef} type={isVisible && !hideEyeIcon ? 'text' : 'password'} {...inputProps} />
      {
        type === 'password' && !hideEyeIcon
      && (
      <button
        type="button"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        <img src={isVisible ? '/icons/visibility_off.svg' : '/icons/visibility.svg'} alt="visibility" />
      </button>
      )
      }
    </div>
  );
}
