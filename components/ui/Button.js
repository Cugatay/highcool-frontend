import clsx from 'clsx';
import React from 'react';
// import { motion } from 'framer-motion';
import styles from '../../styles/components/ui/Button.module.scss';

export default function Button({
  children, className, onClick, disabled, loading, success, forwardRef, ...props
}) {
  return (
    <button type="button" ref={forwardRef} onClick={onClick} className={clsx(styles.button, loading && styles.loading, success && styles.success, className)} disabled={disabled || loading} {...props}>{children}</button>
  );
}
