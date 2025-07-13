'use client'

import React, {useEffect, useMemo, useState} from 'react';

import WrapperAdminPage from "../../../components/ui/admin/wrapperAdminPage/wrapperAdminPage";
import SubTitleAdmin from "../../../components/ui/admin/titleAdmin/subTitleAdmin";
import {SelectField} from "../../../components/ui/admin/fields/fieldsAdmin";
import ErrorComponent from "../../../components/ui/admin/errorComponent/errorComponent";

import ChartToHotels from "./chartToHotels/chartToHotels";
import ChartToApartmentsByHotel from "./chartToApartmentsByhotel/chartToApartmentsByhotel";
import MainChartByHotels from "./mainChartByHotels/mainChartByHotels";
import MainChartByApartments from "./mainChartByApartments/mainChartByApartments";

import {singleRequest} from "../../../services/utils/requestUtils";
import {booking} from '../../../services/api';

import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";


const defaultYear = [
  {value: 2024, view: 2024},
  {value: 2025, view: 2025},
  {value: 2026, view: 2026},
  {value: 2027, view: 2027},
  {value: 2028, view: 2028},
  {value: 2029, view: 2029},
  {value: 2030, view: 2030},
  {value: 2031, view: 2031},
]

const FinanceContainer = ({hotels, apartments}) => {
  useRedirectAdmin();

  const [endingBooking, setEndingBooking] = useState([]);
  const [error, setError] = useState(null);
  const [currentYear, setCurrentYear] = useState(2024);
  const [hotelId, setHotelId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await singleRequest(() => booking.getEndingBooking('conclusion'));

      if (response.error) {
        setError(response.error);
        return;
      }

      const bookingsData = response.data?.data;
      if (!bookingsData?.length) {
        setError('Произошла ошибка при получении данных броней.');
        return;
      }

      setEndingBooking(bookingsData);
    }
    fetchData();
  }, []);

  const handleChange = (e, type) => {
    const {value} = e.target;
    if (type === 'year') {
      setCurrentYear(value)
    }
    if (type === 'hotel') {
      setHotelId(value)
    }
  }

  const bookings = useMemo(() => {
    return endingBooking.length > 0
        ? endingBooking.filter(booking =>
            new Date(booking.start_date_local).getUTCFullYear() === Number(currentYear)
        )
        : [];
  }, [endingBooking, currentYear]);

  const fieldYear = useMemo(() => ({
    name: 'year',
    value: currentYear,
    options: defaultYear
  }), [currentYear]);

  const optionsHotels = useMemo(() => hotels.reduce((acc, hotel) => {
    return [...acc, {value: hotel.id, view: hotel.name}]
  }, []), [hotels])

  const fieldHotel = useMemo(() => ({
    name: 'hotels',
    value: hotelId,
    options: optionsHotels
  }), [optionsHotels, hotelId]);


  const filteredApartments = useMemo(() => (apartments.filter(apartment => apartment.hotel_id === Number(hotelId))),
      [apartments, hotelId]);
  const bookingByApartments = useMemo(() => (bookings.filter(booking => booking.hotel_id === Number(hotelId))),
      [bookings, hotelId]);

  if (!endingBooking.length && !error) return null;

  if (error) {
    return <ErrorComponent title={'Финансы'} text={error}/>
  }

  return (
      <WrapperAdminPage title={'Финансы'}>
        <SelectField field={fieldYear} onChange={(e) => handleChange(e, 'year')}/>
        {!bookings.length
            ? <p>В выбранном году нет завершенных броней</p>
            : <>
              <SubTitleAdmin text={'Доход отелей за весь сезон:'}/>
              <MainChartByHotels hotels={hotels} booking={bookings}/>
              <SubTitleAdmin text={'Доход отелей месячный:'}/>
              <ChartToHotels hotels={hotels} bookings={bookings} year={+currentYear}/>

              <SelectField field={fieldHotel} onChange={(e) => handleChange(e, 'hotel')}/>
              <SubTitleAdmin text={'Доход номеров за весь сезон:'}/>
              <MainChartByApartments apartments={filteredApartments} booking={bookingByApartments}/>
              <SubTitleAdmin text={'Доход номеров(отеля) месячный:'}/>
              <ChartToApartmentsByHotel
                  bookings={bookingByApartments}
                  apartments={filteredApartments}
                  hotelId={+hotelId}
                  year={+currentYear}
              />
            </>
        }
      </WrapperAdminPage>
  );
};

export default FinanceContainer;