'use client';

import React, {useState, useCallback} from 'react';

import {InputField, SelectField} from '../../../../../components/ui/admin/fields/fieldsAdmin';
import {AdminButton} from '../../../../../components/ui/admin/buttons/buttons';

import {notifyShowToast} from '../../../../../utils/showToast';

import styles from './modeContainer.module.css';
import stylesFont from '../../../../../styles/fonts/timesNewRoman.module.css';


const ROLES = [
  {value: 'admin', view: 'Администратор'},
  {value: 'boss', view: 'Владелец'},
];

const ModeContainer = ({admin, mode, setMode, createAdmin, updateAdmin, deleteAdmin}) => {
  const isEditMode = mode === 'edit';

  const [fields, setFields] = useState({
    name: admin?.adminname || '',
    oldPass: '',
    pass: '',
    pass2: '',
    role: admin?.role || 'admin',
  });

  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFields((prev) => ({...prev, [name]: value}));
  }, []);

  const validatePasswords = () => {
    if (fields.pass && fields.pass !== fields.pass2) {
      notifyShowToast('error', 'Пароли не совпадают');
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(() => {
    if (!validatePasswords()) return;

    if (isEditMode) {
      if (!fields.oldPass) {
        notifyShowToast('error', 'Введите старый пароль');
        return;
      }

      const updateData = {
        id: admin.id,
        name: fields.name,
        role: fields.role,
        ...(fields.pass && {
          oldPassword: fields.oldPass,
          password: fields.pass,
        }),
      };
      updateAdmin(updateData);
    } else {
      createAdmin({
        name: fields.name,
        password: fields.pass,
        role: fields.role,
      });
    }
  }, [fields, admin, isEditMode, createAdmin, updateAdmin]);

  const renderField = (label, name, placeholder, type = 'text', isVisible = true) => (
      isVisible && (
          <div className={styles.rowField}>
            <p>{label}:</p>
            <InputField
                field={{type, placeholder, name, value: fields[name]}}
                onChange={handleChange}
            />
          </div>
      )
  );

  return (
      <section className={`${stylesFont.newRoman400} ${styles.containerFields}`}>
        {renderField('Имя', 'name', 'Имя')}
        {renderField('Старый пароль', 'oldPass', 'Старый пароль', 'text', isEditMode)}
        {renderField('Пароль', 'pass', 'Пароль')}
        {renderField('Подтверждение пароля', 'pass2', 'Пароль (повтор)')}

        <div className={styles.rowField}>
          <p>Права:</p>
          <SelectField
              field={{
                name: 'role',
                value: fields.role,
                options: ROLES,
              }}
              onChange={handleChange}
          />
        </div>

        <div className={styles.containerBtns}>
          <AdminButton text="Назад" handleClick={() => setMode('')}/>
          <AdminButton
              text={isEditMode ? 'Обновить' : 'Создать'}
              type="save"
              handleClick={handleSubmit}
          />
          {isEditMode && (
              <AdminButton
                  text="Удалить"
                  type="delete"
                  handleClick={() => deleteAdmin(admin.id)}
              />
          )}
        </div>
      </section>
  );
};

export default ModeContainer;