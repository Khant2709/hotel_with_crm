'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import BannerComponent from "./bannerComponent/bannerComponent";
import AllHotelsContent from "../../components/ui/componentHotels/componentsHotels";

import {useWindowWidth} from "../../hooks/UseWidth";

import {BASE_URL_IMAGES} from "../../config/envData";

import defaultBanner from "../../../public/bannerHotels.webp";

import styles from "./wrapperHotelPage.module.css";


/** Компонент обертка страницы Отели. */
const WrapperHotelPage = ({hotels, banner}) => {
  const width = useWindowWidth();
  const router = useRouter();

  const [bannerParams, setBannerParams] = useState({width: "1920", height: "960"});

  /** Изменение разрешения картинки для компонента Image (width, height - обязательные поля)*/
  useEffect(() => {
    if (width) {
      switch (width) {
        case width <= 1100 && width >= 600:
          setBannerParams({width: "768", height: "640"});
          break;
        case width < 600:
          setBannerParams({width: "480", height: "480"});
          break;
        default:
          setBannerParams({width: "1920", height: "960"});
          break;

      }
    }
  }, [width]);

  const bannerSrc = banner
      ? `${BASE_URL_IMAGES}${banner?.image_path}/${banner?.image_name}`
      : defaultBanner
  ;

  /** Функция перенаправляет на выбранный отель*/
  const redirectToHotel = useCallback((link) => router.push(link), [router]);

  return (
      <main className={styles.main}>
        <BannerComponent banner={bannerSrc} bannerParams={bannerParams}/>
        {width &&
        <AllHotelsContent allHotel={hotels} redirectToHotel={redirectToHotel} width={width}/>}
      </main>
  );
};

export default WrapperHotelPage;