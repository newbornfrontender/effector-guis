import { combine, createApi, createEvent, createStore, forward, guard, restore, sample } from 'effector';
import { nanoid } from 'nanoid';

const validationRegEx = /[\s\d]/gi;

const inputHandler = (e) => e.target.value;

const onResetField = createEvent();

const onChangePrefix = createEvent();
const onResetPrefixField = createEvent();
export const handleChangePrefix = onChangePrefix.prepend(inputHandler);
export const $prefix = restore(onChangePrefix, '').reset(onResetPrefixField);

const $list = createStore([]);
const { onCreate, onUpdate, onDelete } = createApi($list, {
  onCreate: (state, { fullName, ...rest }) => [
    ...state,
    {
      id: nanoid(),
      title: fullName,
      info: {
        fullName,
        ...rest,
      },
    },
  ],
  onUpdate: (state, { id, fullName, ...rest }) =>
    state.map((item) => (item.id === id ? { ...item, title: fullName, info: { fullName, ...rest } } : item)),
  onDelete: (state, payload) => state.filter((item) => item.id !== payload),
});
export const handleCreate = createEvent();
export const handleUpdate = createEvent();
export const handleDelete = createEvent();

const onChangeFilteredList = createEvent();
export const $filteredList = $list
  .map((store) => store)
  .on(onChangeFilteredList, (_, { list, prefix }) => list.filter(({ title }) => title.includes(prefix)));

const onChangeName = createEvent();
export const handleChangeName = onChangeName.prepend(inputHandler);
export const $name = restore(onChangeName, '').reset(onResetField);

const onChangeSurName = createEvent();
export const handleChangeSurName = onChangeSurName.prepend(inputHandler);
export const $surName = restore(onChangeSurName, '').reset(onResetField);

export const $fullName = combine($name, $surName, (name, surName) => `${name} ${surName}`);

const initialSelectedItemState = () => ({
  id: '',
  info: {
    name: '',
    surName: '',
    fullName: '',
  },
});

export const onSelectItem = createEvent();
const onUnselectItem = createEvent();
export const $selectedItem = createStore(initialSelectedItemState())
  .on(onSelectItem, (state, payload) => (state.id !== payload.id ? payload : initialSelectedItemState()))
  .reset(onUnselectItem);

export const $createDisabled = combine(
  $name,
  $surName,
  $fullName,
  $selectedItem,
  (name, surName, fullName, { info }) => !(name.length > 0 && surName.length > 0 && fullName !== info.fullName),
);

export const $editDisabled = combine(
  $createDisabled,
  $selectedItem,
  (createDisabled, { id }) => !(!createDisabled && id !== ''),
);

export const $deleteDisabled = combine($selectedItem, ({ id }) => id === '');

guard({
  clock: handleCreate,
  source: { name: $name, surName: $surName, fullName: $fullName },
  filter: ({ name, surName }) => !validationRegEx.test(name) && !validationRegEx.test(surName),
  target: onCreate,
});

sample({
  clock: onChangePrefix,
  source: { prefix: $prefix, list: $list },
  target: onChangeFilteredList,
});

sample({
  clock: onSelectItem,
  source: $selectedItem,
  fn: ({ info }) => info.name,
  target: onChangeName,
});

sample({
  clock: onSelectItem,
  source: $selectedItem,
  fn: ({ info }) => info.surName,
  target: onChangeSurName,
});

sample({
  clock: handleUpdate,
  source: { name: $name, surName: $surName, fullName: $fullName, selectedItem: $selectedItem },
  fn: ({ selectedItem, ...rest }) => ({ id: selectedItem.id, ...rest }),
  target: onUpdate,
});

sample({
  clock: handleDelete,
  source: $selectedItem,
  fn: ({ id }) => id,
  target: onDelete,
});

forward({
  from: [onCreate, onUpdate, onDelete],
  to: [onResetField, onUnselectItem, onResetPrefixField],
});

forward({
  from: onChangePrefix,
  to: [onResetField, onUnselectItem],
});
