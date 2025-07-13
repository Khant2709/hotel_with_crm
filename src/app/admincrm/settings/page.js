'use client'

import React, {useMemo, useState} from 'react';

import SubNavigation from "../../../particles/admin/settings/subNavigation/subNavigation";
import EndingBooking from "../../../particles/admin/settings/endingBooking/endingBooking";

import WrapperAdminPage from "../../../components/ui/admin/wrapperAdminPage/wrapperAdminPage";

import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";
import AdminSettings from "../../../particles/admin/settings/adminSettings/adminSettings";


const navigation = [
  {title: 'Администраторы', type: 'create_admin'},
  {title: 'Завершенные брони', type: 'reservation_conclusion'},
  {title: 'Удаленные брони', type: 'reservation_deleted'},
];

const SettingsAdminPage = () => {
  useRedirectAdmin();

  const [activeType, setActiveType] = useState('');

  const toggleActiveType = (type) => {
    setActiveType(type || '');
  }

  const isBookingType = useMemo(() => activeType === 'reservation_conclusion' || activeType === 'reservation_deleted', [activeType]);
  const title = useMemo(() => navigation.find(el => el.type === activeType), [activeType])

  return (
      <WrapperAdminPage title={'Настройки'}>
        <SubNavigation navigation={navigation} toggleActiveType={toggleActiveType}/>
        {isBookingType && <EndingBooking activeType={activeType} title={title.title}/>}
        {activeType === 'create_admin' && <AdminSettings setActiveType={setActiveType}/>}
      </WrapperAdminPage>
  );
};

export default SettingsAdminPage;