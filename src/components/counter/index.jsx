import React from 'react';
import { useStore } from 'effector-react';

import { Block } from '../../ui/block';
import { $counter, onIncrement, onDecrement, onReset } from './model';
import styles from './styles.module.css';

const actions = [
  {
    text: 'inc',
    handler: onIncrement,
  },
  {
    text: 'dec',
    handler: onDecrement,
  },
  {
    text: 'res',
    handler: onReset,
  },
];

export const Counter = () => {
  const counter = useStore($counter);

  return (
    <Block title="(1) Counter">
      <input type="number" className={styles.field} disabled value={counter} />

      {actions.map(({text, handler}) => <button type="button" key={text} onClick={handler}>{text}</button>)}
    </Block>
  );
};
