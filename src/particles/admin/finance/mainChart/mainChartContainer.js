import React from 'react';
import ChartRevenue from "../../../../components/ui/admin/chart/chart";
import TitleAdmin from "../../../../components/ui/admin/titleAdmin/titleAdmin";


const revenueGenerate = (booking, type) => {
  return booking.reduce((acc, booking) => {
    const id = booking[type];
    acc[id] = (acc[id] || 0) + booking.total_price;
    return acc;
  }, {});
}

const MainChartContainer = ({hotels, apartments, endingBooking}) => {
  // Агрегируем доход по hotel_id
  const revenueByHotel = revenueGenerate(endingBooking, 'hotel_id');
  // Агрегируем доход по apartment_id
  const revenueByApartment = revenueGenerate(endingBooking, 'apartment_id');

// Шаг 2: Преобразуем hotels в массив для графика
  const chartHotelData = hotels.map(hotel => ({
    name: hotel.name,
    revenue: revenueByHotel[hotel.id] || 0,
  }));



// Шаг 2: Преобразуем apartments в массив для графика
  const chartApartmentData = apartments.map(apartments => ({
    name: apartments.apartment_name,
    revenue: revenueByApartment[apartments.id] || 0, // 0, если нет бронирований
  }));

  return (
      <>
        <TitleAdmin text={'Общие данные'}/>
        <p>Данные по отелям</p>
        <ChartRevenue dataChart={chartHotelData} nameDataKey={"revenue"} nameXAxis={"name"}/>
        <p>Данные по номерам</p>
        <ChartRevenue
            dataChart={chartApartmentData} nameDataKey={"revenue"} nameXAxis={"name"} needBrush={true} styleChar={{
          height: 700,
          marginB: 150
        }}
        />
      </>
  );
};

export default MainChartContainer;