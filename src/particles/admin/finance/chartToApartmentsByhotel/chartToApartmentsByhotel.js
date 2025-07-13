import React, {useMemo} from 'react';
import ChartComponents from "../../../../components/ui/admin/chart/chartComponents";


const BASE_OPTIONS_PROPS = {
  xCategories: ['май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь'],
  distributed: false,
  height: 600,
  useCustomTooltip: false
}

const MONTH_INDEXES = [4, 5, 6, 7, 8, 9];

const ChartToApartmentsByHotel = ({apartments, bookings, hotelId, year}) => {
  const series = useMemo(() => transformToChartSeries(hotelId, apartments, bookings, year),
      [hotelId, apartments, bookings, year]);

  return (
      <ChartComponents series={series} optionsProps={BASE_OPTIONS_PROPS}/>
  );
};

export default React.memo(ChartToApartmentsByHotel);


function transformToChartSeries(hotelId, apartments, bookings, year) {
  // Создаем мапу отелей для быстрого доступа по ID
  const apartmentMap = apartments.reduce((acc, apartment) => {
    acc[apartment.id] = apartment.apartment_name;
    return acc;
  }, {});

  // Инициализируем объект для хранения данных по отелям
  const apartmentData = {};
  // Проходим по всем бронированиям
  bookings.forEach(booking => {
    if (booking.hotel_id !== hotelId) return;

    const startDate = new Date(booking.start_date_local);
    const endDate = new Date(booking.end_date_local);
    const bookingYear = startDate.getFullYear();

    // Проверяем, соответствует ли год
    if (bookingYear !== year) return;

    const apartmentId = booking.apartment_id;
    const totalPrice = booking.total_price;

    // Если отель не в списке, пропускаем
    if (!apartmentMap[apartmentId]) return;

    // Инициализируем массив данных для отеля, если еще не существует
    if (!apartmentData[apartmentId]) {
      apartmentData[apartmentId] = Array(MONTH_INDEXES.length)
          .fill(0); // [0, 0, 0, 0, 0, 0]
    }

    const startMonth = startDate.getMonth(); // 0-11
    const endMonth = endDate.getMonth(); // 0-11

    // Если бронирование в одном месяце
    if (startMonth === endMonth) {
      const monthIndex = MONTH_INDEXES.indexOf(startMonth);
      if (monthIndex !== -1) { // Если месяц в диапазоне Май-Октябрь
        apartmentData[apartmentId][monthIndex] += totalPrice;
      }
    } else {
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Разница в днях
      const pricePerDay = totalPrice / daysDiff; // Цена за день
      // Бронирование охватывает разные месяцы
      let currentDate = new Date(startDate);
      while (currentDate < endDate) {
        const currentMonth = currentDate.getMonth();
        const nextMonthStart = new Date(year, currentMonth + 1, 1); // Начало следующего месяца
        const daysUntilNext = Math.min(
            Math.ceil((nextMonthStart - currentDate) / (1000 * 60 * 60 * 24)),
            Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))
        );

        const monthIndex = MONTH_INDEXES.indexOf(currentMonth);
        if (monthIndex !== -1) {
          const priceForDays = pricePerDay * daysUntilNext;
          apartmentData[apartmentId][monthIndex] += priceForDays;
        }

        currentDate.setDate(currentDate.getDate() + daysUntilNext);
      }
    }
  });

  // Преобразуем hotelData в формат series
  return Object.keys(apartmentData)
      .map(hotelId => ({
        name: apartmentMap[hotelId],
        data: apartmentData[hotelId]
      }));
}