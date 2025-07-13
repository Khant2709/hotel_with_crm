import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Brush} from 'recharts';


const formatNumber = (num) => {
  return num.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

const ChartRevenue = ({dataChart, nameXAxis, nameDataKey, needBrush = false, styleChar}) => {
  return (
      <BarChart
          width={styleChar?.width || 1200}
          height={styleChar?.height || 500}
          data={dataChart}
          margin={{top: 20, right: 30, left: 20, bottom: styleChar?.marginB || 50}}
          style={{padding: '1rem'}}
      >
        {needBrush && <Brush dataKey={nameXAxis} height={30} startIndex={0} endIndex={10} stroke="#7E77F3CC"/>}

        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis
            dataKey={nameXAxis}
            interval={0}
            angle={-45}
            textAnchor="end"
            tick={{fontSize: 10}}
        />
        <YAxis tickFormatter={formatNumber}/>
        <Tooltip
            formatter={(value, name) => [formatNumber(value), "Доход"]}
        />
        <Bar dataKey={nameDataKey} fill="#7E77F3CC" name="Доход"/>
      </BarChart>
  );
};

export default ChartRevenue;