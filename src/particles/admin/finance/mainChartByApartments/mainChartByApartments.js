import React, {useMemo} from 'react';

import ChartComponents from "../../../../components/ui/admin/chart/chartComponents";

import {revenueGenerate} from "../../../../utils/admin/revenueGenerate";


const baseOptionsProps = {
  distributed: true,
  height: 600,
  useCustomTooltip: true
};

const MainChartByApartments = ({apartments, booking}) => {
  const revenueByApartments = useMemo(() => revenueGenerate(booking, 'apartment_id'), [booking]);
  const apartmentNames = useMemo(() => apartments.map(apartment => apartment.apartment_name), [apartments]);

  // Подготовка данных для series
  const seriesData = useMemo(() => {
    const bookingsByApartments = booking.reduce((acc, b) => {
      acc[b.apartment_id] = acc[b.apartment_id] || [];
      acc[b.apartment_id].push(b);
      return acc;
    }, {});

    return apartments.map(apartment => {
      const bookingsForApartment = bookingsByApartments[apartment.id] || [];
      const revenue = revenueByApartments[apartment.id] || 1;
      const totalAdults = bookingsForApartment.reduce((sum, b) => sum + (b.count_adults || 0), 0);
      const totalChildren = bookingsForApartment.reduce((sum, b) => sum + (b.count_children || 0), 0);

      return {
        x: apartment.apartment_name,
        y: revenue,
        adults: totalAdults,
        children: totalChildren,
        countBooking: bookingsForApartment.length
      };
    });
  }, [apartments, booking]);

  const series = useMemo(() => [{
    name: 'Доход по апартаментам',
    data: seriesData
  }], [seriesData]);

  const optionsProps = useMemo(() => ({
    ...baseOptionsProps,
    xCategories: apartmentNames
  }), [apartmentNames]);

  return (
      <ChartComponents series={series} optionsProps={optionsProps}/>
  );
};

export default React.memo(MainChartByApartments);