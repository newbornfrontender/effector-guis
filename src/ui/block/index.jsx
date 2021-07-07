import React from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

export const Block = ({ children, title, className }) => {
  return (
    <section className={styles.wrapper}>
      {title && <h2>{title}</h2>}

      <div className={cn(className, styles.content)}>{children}</div>
    </section>
  );
};
