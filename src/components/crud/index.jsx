import React, { useMemo } from 'react';
import cn from 'classnames';

import { Block } from '../../ui/block';
import styles from './styles.module.css';
import {
  $createDisabled,
  $editDisabled,
  $deleteDisabled,
  $filteredList,
  $fullName,
  $name,
  $selectedItem,
  $surName,
  $prefix,
  handleChangeName,
  handleChangeSurName,
  handleCreate,
  handleDelete,
  onSelectItem,
  handleUpdate,
  handleChangePrefix,
} from './model';
import { useStore } from 'effector-react';

const Field = ({ className, title, value, onChange, width, disabled }) => {
  return (
    <div className={cn(className, styles.field)}>
      <p>{title}:</p>
      <input type="text" value={value} onChange={onChange} disabled={disabled} style={{ inlineSize: width }} />
    </div>
  );
};

export const Crud = () => {
  const name = useStore($name);
  const surName = useStore($surName);
  const fullName = useStore($fullName);
  const createDisabled = useStore($createDisabled);
  const editDisabled = useStore($editDisabled);
  const deleteDisabled = useStore($deleteDisabled);
  const filteredList = useStore($filteredList);
  const selectedItem = useStore($selectedItem);
  const prefix = useStore($prefix);

  const buttons = useMemo(
    () => [
      { name: 'Create', handler: handleCreate, disabled: createDisabled },
      { name: 'Update', handler: handleUpdate, disabled: editDisabled },
      { name: 'Delete', handler: handleDelete, disabled: deleteDisabled },
    ],
    [createDisabled, editDisabled, deleteDisabled],
  );

  return (
    <Block title="(5) CRUD" className={styles.wrapper}>
      <Field title="Filter prefix" className={styles.filter} value={prefix} onChange={handleChangePrefix} width={150} />

      <ul className={styles.list}>
        {filteredList.map(({ id, title, info }) => (
          <li key={id} className={cn({ active: selectedItem.id === id })} onClick={() => onSelectItem({ id, info })}>
            {title}
          </li>
        ))}
      </ul>

      <div className={styles.fields}>
        <Field title="Name" width={120} value={name} onChange={handleChangeName} />
        <Field title="Surname" width={120} value={surName} onChange={handleChangeSurName} />
        <Field title="Fullname" width={120} value={fullName} disabled />
      </div>

      <div className={styles.buttons}>
        {buttons.map(({ name, handler, disabled }) => (
          <button type="button" key={name} onClick={handler} disabled={disabled}>
            {name}
          </button>
        ))}
      </div>
    </Block>
  );
};
