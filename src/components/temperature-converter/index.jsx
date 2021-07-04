import React from 'react';
import { useStore } from 'effector-react';

import { Block } from '../../ui/block';
import { $celsius, $fahrenheit, handleChangeCelsius, handleChangeFahrenheit } from './model';
import styles from './styles.module.css';

const Field = ({ name, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{name}</p>
      <input type="number" value={value} onChange={onChange} />
    </div>
  );
};

export const TemperatureConverter = () => {
  const celsius = useStore($celsius);
  const fahrenheit = useStore($fahrenheit);

  return (
    <Block title="(2) Temperature Converter">
      <Field name="Celsius" value={celsius} onChange={handleChangeCelsius} />
      <Field name="Fahrenheit" value={fahrenheit} onChange={handleChangeFahrenheit} />
    </Block>
  );
};
