import { createEvent, createStore } from 'effector';

const enhance = (fn) => (store) => store.map(fn);
const inputHandler = (e) => e.target.value;

const convertToCelsius = (fahrenheit) => (fahrenheit - 32) * (5 / 9);
const convertToFahrenheit = (celsius) => celsius * (9 / 5) + 32;
const roundToDecimals = (num) => Number(num).toFixed(2);

export const onChangeCelsius = createEvent();
export const onChangeFahrenheit = createEvent();

export const handleChangeCelsius = onChangeCelsius.prepend(inputHandler);
export const handleChangeFahrenheit = onChangeFahrenheit.prepend(inputHandler);

export const $celsius = createStore(0)
  .on(onChangeCelsius, (_, payload) => payload)
  .on(onChangeFahrenheit, (_, payload) => convertToCelsius(payload))
  .thru(enhance(roundToDecimals));

export const $fahrenheit = $celsius
  .map(convertToFahrenheit)
  .on(onChangeFahrenheit, (_, payload) => payload)
  .thru(enhance(roundToDecimals));
