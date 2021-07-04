import React from 'react';

import { Counter } from './components/counter';
import { TemperatureConverter } from './components/temperature-converter';

export const App = () => {
  return (
    <main>
      <Counter />

      <TemperatureConverter />
    </main>
  );
};
