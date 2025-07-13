'use client'

import React from 'react';

import ContentContacts from "./contentContacts/contentContacts";

import {useWindowWidth} from "../../hooks/UseWidth";


/** Компонент обертка для страницы контактов */
const WrapperContactsPage = ({hotel, hotels}) => {
  const width = useWindowWidth();

  return (
      <ContentContacts width={width} textConclusion={hotel?.text_conclusion} hotelsData={hotels}/>
  );
};

export default WrapperContactsPage;