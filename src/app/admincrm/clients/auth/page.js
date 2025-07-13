'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import ComponentAuth from "../../../../components/ui/admin/authPage/componentAuth";

import {useRedirectAdmin} from "../../../../hooks/useRedirectAdmin";
import {notifyShowToast} from "../../../../utils/showToast";

import {auth} from '../../../../services/api';
import {singleRequest} from "../../../../services/utils/requestUtils";


const ClientsAuthPage = () => {
  useRedirectAdmin();

  const router = useRouter();
  const [value, setValue] = useState('');

  const authFetch = async (pass) => {
    const response = await singleRequest(() => auth.loginPage({pass}))

    if (response.error) {
      notifyShowToast('error', response.error || 'Данные не найдены, нужно войти.');
      return;
    }

    if (response.status === 200) {
      notifyShowToast('success', response.data.message);
      sessionStorage.setItem("LordOfTheRings", pass);
      router.push('/admincrm/clients/data')
    }
  };

  useEffect(() => {
    notifyShowToast('info', 'Проверка данных...');
    const valueStorage = sessionStorage.getItem("LordOfTheRings");
    if (valueStorage) {
      authFetch(valueStorage)
    } else {
      notifyShowToast('error', 'Данные не найдены, нужно войти.');
    }
  }, [])


  return (
      <ComponentAuth value={value} setValue={setValue} auth={() => authFetch(value)}/>
  );
};

export default ClientsAuthPage;