import { createApi, createEvent, createStore } from 'effector';

export const onReset = createEvent();

export const $counter = createStore(0).reset(onReset);

export const { onIncrement, onDecrement } = createApi($counter, {
  onIncrement: (state) => state + 1,
  onDecrement: (state) => state - 1,
});
