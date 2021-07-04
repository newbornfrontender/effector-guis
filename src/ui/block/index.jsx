import React from 'react';

import styles from './styles.module.css';

export const Block = ({ children, title }) => {
  return (
    <section className={styles.wrapper}>
      {title && <h2>{title}</h2>}

      <div className={styles.content}>{children}</div>
    </section>
  );
};
