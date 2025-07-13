import React, {useMemo} from 'react';

import ChartComponents from "../../../../components/ui/admin/chart/chartComponents";

import {revenueGenerate} from "../../../../utils/admin/revenueGenerate";
import {formatPrice} from "../../../../utils/admin/formatPrice";

import styles from '../stylesContainer.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';


const baseOptionsProps = {
  distributed: true,
  useCustomTooltip: true
};

const MainChartByHotels = ({hotels, booking}) => {
  const revenueByHotel = useMemo(() => revenueGenerate(booking, 'hotel_id'), [booking]);
  const hotelNames = useMemo(() => hotels.map(hotel => hotel.name), [hotels]);

  const seriesData = useMemo(() => {
    const bookingsByHotel = booking.reduce((acc, b) => {
      acc[b.hotel_id] = acc[b.hotel_id] || [];
      acc[b.hotel_id].push(b);
      return acc;
    }, {});

    return hotels.map(hotel => {
      const bookingsForHotel = bookingsByHotel[hotel.id] || [];
      const revenue = revenueByHotel[hotel.id] || 1;
      const totalAdults = bookingsForHotel.reduce((sum, b) => sum + (b.count_adults || 0), 0);
      const totalChildren = bookingsForHotel.reduce((sum, b) => sum + (b.count_children || 0), 0);

      return {
        x: hotel.name,
        y: revenue,
        adults: totalAdults,
        children: totalChildren,
        countBooking: bookingsForHotel.length
      };
    });
  }, [hotels, booking]);

  const series = useMemo(() => [{
    name: 'Доход по отелям',
    data: seriesData
  }], [seriesData]);

  const optionsProps = useMemo(() => ({
    ...baseOptionsProps,
    xCategories: hotelNames
  }), [hotelNames]);

  const sum = useMemo(() => {
    return Object.values(revenueByHotel)
        .reduce((acc, info) => acc + info, 0);
  }, [revenueByHotel]);

  return (
      <section className={`${stylesFont.newRoman400} ${styles.container}`}>
        <div className={styles.containerHotel}>
          <p>Общий доход:</p>
          <p>{formatPrice(sum)} р</p>
        </div>
        <ChartComponents series={series} optionsProps={optionsProps}/>
      </section>
  );
};

export default React.memo(MainChartByHotels);