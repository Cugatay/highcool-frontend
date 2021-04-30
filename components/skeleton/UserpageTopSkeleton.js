import React from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from '../../styles/components/skeleton/UserpageTopSkeleton.module.scss';

export default function UserpageTopSkeleton() {
  return (
    <SkeletonTheme color="#424242">
      <div className={styles.top}>
        <Skeleton className={clsx('avatar', styles.avatar)} />
        <Skeleton className={styles.username} />
        <Skeleton className={styles.nameSurname} />
        <Skeleton className={styles.followButton} />
        <Skeleton className={styles.followersCount} />
      </div>
    </SkeletonTheme>
  );
}
