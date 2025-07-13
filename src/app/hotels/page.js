import React from "react";

import {mataDataHotelsPage} from "../../data/metaData";
import {jsonLDHotelsPage} from "../../data/seoData";

import WrapperHotelPage from "../../particles/pageHotels/wrapperHotelPage";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {hotelsAPI} from '../../services/api';
import {batchRequest} from "../../services/utils/requestUtils";

import {TIME_CASH} from "../../config/envData";


/** Мета данные страницы отелей */
export const metadata = mataDataHotelsPage;

async function fetchData() {
  const initial = {
    hotelsData: null,
    bannerData: null,
  };

  const request = [
    () => hotelsAPI.getMainHotelsData(TIME_CASH["60min"]),
    () => hotelsAPI.getBannerHotelsPage(TIME_CASH["60min"]),
  ];

  return await batchRequest(initial, request);
}

/** Основной (серверный компонент) страницы отелей */
export default async function Hotels() {
  const {hotelsData, bannerData} = await fetchData();

  if (hotelsData.status !== 200 || bannerData.status !== 200) {
    return <ErrorResponseData
        hasHeaderLine={true}
        page={"Hotels"}
        error={hotelsData?.error || bannerData?.error}
        text={"Произошла ошибка, не уалось загрузить данные отеля."}
    />
  }

  const hotels = hotelsData.data.data;
  const banner = bannerData.data.data[0];

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDHotelsPage)}}
        />
        <WrapperHotelPage
            ssrData={{hotelsData: hotelsData.data, bannerData: bannerData?.data[0]}}
            hotels={hotels} banner={banner}
        />
      </>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;