import React from 'react';

import { Counter } from './components/counter';
import { TemperatureConverter } from './components/temperature-converter';
import { Crud } from './components/crud';

export const App = () => {
  return (
    <main>
      <Counter />
      <TemperatureConverter />
      <Crud />
    </main>
  );
};
