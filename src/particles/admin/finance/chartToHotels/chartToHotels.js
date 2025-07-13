import React, {useMemo} from 'react';
import ChartComponents from "../../../../components/ui/admin/chart/chartComponents";


const BASE_OPTIONS_PROPS = {
  xCategories: ['май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь'],
  distributed: false,
  useCustomTooltip: false
};

const MONTH_INDEXES = [4, 5, 6, 7, 8, 9];
const MS_PER_DAY = 1000 * 60 * 60 * 24;


const ChartToHotels = ({hotels, bookings, year}) => {
  const series = useMemo(() => transformToChartSeries(hotels, bookings, year), [hotels, bookings, year]);

  return (
      <ChartComponents series={series} optionsProps={BASE_OPTIONS_PROPS}/>
  );
};

export default React.memo(ChartToHotels);


function transformToChartSeries(hotels, bookings, year) {
  const hotelMap = hotels.reduce((acc, hotel) => {
    acc[hotel.id] = hotel.name;
    return acc;
  }, {});
  const hotelData = {};

  const distributeRevenue = (startDate, endDate, totalPrice, hotelId) => {
    const daysDiff = Math.ceil((endDate - startDate) / MS_PER_DAY);
    const pricePerDay = totalPrice / daysDiff;
    let currentDate = new Date(startDate);

    while (currentDate < endDate) {
      const currentMonth = currentDate.getMonth();
      const monthIndex = MONTH_INDEXES.indexOf(currentMonth);
      const nextMonthStart = new Date(year, currentMonth + 1, 1);
      const daysUntilNext = Math.min(
          Math.ceil((nextMonthStart - currentDate) / MS_PER_DAY),
          Math.ceil((endDate - currentDate) / MS_PER_DAY)
      );

      if (monthIndex !== -1) {
        hotelData[hotelId][monthIndex] += pricePerDay * daysUntilNext;
      }

      currentDate.setDate(currentDate.getDate() + daysUntilNext);
    }
  };

  bookings.forEach(booking => {
    const startDate = new Date(booking.start_date_local);
    const endDate = new Date(booking.end_date_local);
    const bookingYear = startDate.getFullYear();

    if (bookingYear !== year) return;

    const hotelId = booking.hotel_id;
    const totalPrice = booking.total_price;

    if (!hotelMap[hotelId]) return;

    if (!hotelData[hotelId]) {
      hotelData[hotelId] = Array(MONTH_INDEXES.length)
          .fill(0);
    }

    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    if (startMonth === endMonth) {
      const monthIndex = MONTH_INDEXES.indexOf(startMonth);
      if (monthIndex !== -1) {
        hotelData[hotelId][monthIndex] += totalPrice;
      }
    } else {
      distributeRevenue(startDate, endDate, totalPrice, hotelId);
    }
  });

  return Object.keys(hotelData)
      .map(hotelId => ({
        name: hotelMap[hotelId],
        data: hotelData[hotelId]
      }));
}