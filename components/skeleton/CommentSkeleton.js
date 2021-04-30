import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from '../../styles/components/skeleton/CommentSkeleton.module.scss';

export default function CommentSkeleton() {
  return (
    <SkeletonTheme color="#424242">
      <Skeleton className={styles.content} />
    </SkeletonTheme>
  );
}
