import React from 'react';

import FinanceContainer from "../../../../particles/admin/finance/financeContainer";
import ErrorComponent from "../../../../components/ui/admin/errorComponent/errorComponent";

import {hotels, apartments} from '../../../../services/api'
import {batchRequest} from "../../../../services/utils/requestUtils";


async function fetchData() {
  const initial = {
    allHotelsData: null,
    allApartmentsData: null,
  };

  const request = [
    () => hotels.getMainHotelsData(),
    () => apartments.getAllApartments(),
  ];

  return await batchRequest(initial, request);
}

export default async function FinancePage() {
  const {allHotelsData, allApartmentsData} = await fetchData();

  const allHotels = allHotelsData.data.data.map(hotel => ({id: hotel.id, name: hotel.name, type: hotel.type}));
  const allApartments = allApartmentsData.data.data.map(apartment => {
    const {id, hotel_id, apartment_name, apartment_number} = apartment;
    return {id, hotel_id, apartment_name, apartment_number}
  })

  if (allHotelsData.status !== 200 || allApartmentsData.status !== 200) {
    return <ErrorComponent title={'Финансы'} text={allHotelsData.error || allApartmentsData.error}/>
  }

  return (
      <FinanceContainer hotels={allHotels} apartments={allApartments}/>
  );
};