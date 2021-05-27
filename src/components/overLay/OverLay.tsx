import React from 'react';
import styles from './overlay.module.scss';

export default function Overlay({ isOpen, children }: any) {
  return (
    <div
      className={styles.wrapper}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
}
