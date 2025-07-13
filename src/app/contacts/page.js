import React from "react";

import WrapperContactsPage from "../../particles/pageContacts/wrapperContactsPage";

import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {batchRequest} from "../../services/utils/requestUtils";
import {hotelsAPI} from '../../services/api';

import {jsonLDContactsPage} from "../../data/seoData";
import {metaDataContactsPage} from "../../data/metaData";
import {HOTEL_ID, TIME_CASH} from "../../config/envData";


/** Мета данные страницы контактов */
export const metadata = metaDataContactsPage;

async function fetchData() {
  const hotelData = {
    hotelData: null,
    allHotelData: null,
  };

  const request = [
    () => hotelsAPI.getCurrentHotelData(HOTEL_ID, null, TIME_CASH["60min"]),
    () => hotelsAPI.getMainHotelsData(TIME_CASH["60min"]),
  ];

  return await batchRequest(hotelData, request);
}

/** Основной (серверный компонент) страницы контактов */
export default async function ContactsPage() {
  const {hotelData, allHotelData} = await fetchData();

  if (hotelData.status !== 200 || allHotelData.status !== 200) {
    return <ErrorResponseData
        hasHeaderLine={true}
        page={"Contacts"}
        error={hotelData?.error || allHotelData?.error}
        text={"Произошла ошибка, не уалось загрузить данные отеля."}
    />
  }

  const hotel = hotelData.data.data.hotel;
  const hotels = allHotelData.data.data;


  return (
      <section>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDContactsPage)}}
        />
        <WrapperContactsPage hotel={hotel} hotels={hotels}/>
      </section>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;