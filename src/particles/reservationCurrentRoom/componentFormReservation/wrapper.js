"use client";

import {useState, useEffect, useMemo} from "react";

import {ContentFormReservation, ContentError} from "./contentForm/contentForm";

import {getFields} from "./fieldsForm";
import {validFieldAndGetPrice} from "./validFieldAndGetPrice";

import {usePopUpWindow} from "../../../hooks/useWindowPopUp";

import styles from "./wrapperFormReservation.module.css";


const WrapperFormReservation = ({
                                  dataReservation,
                                  setDataReservation,
                                  countAdults,
                                  countChildren,
                                  allBookings,
                                  allApartments,
                                  currentApartment,
                                  currentHotel,
                                  hotelNumber,
                                }) => {
  const {setReservationData: setDataPopUpWindow, togglePopUpWindow} = usePopUpWindow();
  const [dataPeople, setDataPeople] = useState({
    countAdults: countAdults || 1,
    countChildren: countChildren || 0,
  });
  // const {openClosePopUp, updateReservation} = useReservationStore();
  const [dataPrice, setDataPrice] = useState({
    averageSumPerDay: 0,
    totalSum: 0,
    totalDays: 0,
  });

  const [errorReservation, setErrorReservation] = useState(null);

  const startDate = useMemo(
      () => new Date(dataReservation.startDataReservation),
      [dataReservation.startDataReservation]
  );

  const endDate = useMemo(
      () => new Date(dataReservation.endDataReservation),
      [dataReservation.endDataReservation]
  );

  useEffect(() => {
    validFieldAndGetPrice({
      startDate,
      endDate,
      dataPeople,
      currentApartment,
      allBookings,
      allApartments,
      dataPrice,
      errorReservation,
      setDataPrice,
      setErrorReservation
    })
  }, [
    startDate,
    endDate,
    dataReservation,
    dataPeople,
    currentApartment,
    allBookings,
    allApartments,
    dataPrice,
    errorReservation,
  ]);

  /** Передача данных о брони в сплывающее окно */
  const startReservation = () => {
    if (!errorReservation) {
      setDataPopUpWindow({
        idHotel: currentHotel.id,
        nameHotel: `База отдыха "${currentHotel.name}"`,
        idApartment: currentApartment.id,
        apartment_number: currentApartment.apartment_number,
        nameApartment: currentApartment.apartment_name,
        startData: dataReservation.startDataReservation,
        endData: dataReservation.endDataReservation,
        countAdults: dataPeople.countAdults,
        countChildren: dataPeople.countChildren,
        priceOneNight: dataPrice.averageSumPerDay,
        finishPrice: dataPrice.totalSum,
      });
      togglePopUpWindow();
    }
  };

  const fieldsForm = getFields(setDataReservation, setDataPeople, dataReservation, dataPeople, dataPrice);

  return (
      <div className={styles.wrapperForm}>
        <ContentFormReservation
            fields={fieldsForm}
            hotelNumber={hotelNumber}
            startReservation={startReservation}
            errorReservation={errorReservation}
        />
        <ContentError errorReservation={errorReservation}/>
      </div>
  );
};

export default WrapperFormReservation;
