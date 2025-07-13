import React from 'react';
import dynamic from 'next/dynamic';

import './chartComponents.css';


const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});

const formatNumber = (num) => {
  return num.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

const ChartComponents = ({series, optionsProps}) => {
  const options = {
    chart: {
      type: 'bar',
      width: "100%",
    },
    plotOptions: {
      bar: {
        distributed: optionsProps?.distributed || false,
        horizontal: false,
        columnWidth: '70%',
        endingShape: 'rounded',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: optionsProps?.xCategories || [],
      labels: {
        formatter: function (value) {
          const maxLength = 6;
          return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
        }
      },
    },
    yaxis: {
      title: {
        text: 'Доход в ₽',
      },
      labels: {
        formatter: function (val) {
          return formatNumber(val);
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      ...(optionsProps?.useCustomTooltip
          ? {
            custom: function ({seriesIndex, dataPointIndex, w}) {
              const data = w.config.series[seriesIndex].data[dataPointIndex];
              let tooltipContent = `
            <div class="apexcharts-tooltip-custom">
              <p class="tooltip-title"><strong>${data.x}</strong></p>
              <div class="tooltip-container-info">
                <p>Доход: ${formatNumber(data.y)} ₽</p>
          `;
              if (data?.adults) {
                tooltipContent += `<p>Взрослых: ${data.adults}</p>`;
              }
              if (data?.children) {
                tooltipContent += `<p>Детей: ${data.children}</p>`;
              }
              if (data?.countBooking) {
                tooltipContent += `<p>Броней: ${data.countBooking}</p>`;
              }

              tooltipContent += `
              </div>
            </div>
          `;
              return tooltipContent;
            }
          }
          : {
            y: {
              formatter: function (val) {
                return "Доход: " + formatNumber(val) + " ₽";
              }
            },
            x: {
              formatter: function (value, {seriesIndex, dataPointIndex, w}) {
                return w.globals.labels[dataPointIndex];
              }
            }
          })
    },
    noData: {
      text: 'Loading...'
    },
    colors: [
      '#FF5733', '#33FF57', '#1b498d', '#FF33A1', '#A133FF',
      '#FFBD33', '#33FFF5', '#FF3333', '#33FFBD', '#5733FF',
      '#FF8C33', '#33FF8C', '#8C33FF', '#FF338C', '#33A1FF',
      '#A1FF33', '#FF33F5', '#33D4FF', '#D4FF33', '#FF7F33',
      '#33A1D4', '#A1D4FF', '#FF337F', '#33FFA1', '#FFA133',
      '#33FFD4', '#D4A1FF', '#7F33FF', '#FF9933', '#33CCFF'
    ]
  };

  return (
      <div>
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={optionsProps?.height || 350}
        />
      </div>
  );
};

export default ChartComponents;

const colors = [
  '#FF5733', '#33FF57', '#1b498d', '#FF33A1', '#A133FF',
  '#FFBD33', '#33FFF5', '#FF3333', '#33FFBD', '#5733FF',
  '#FF8C33', '#33FF8C', '#8C33FF', '#FF338C', '#33A1FF',
  '#A1FF33', '#FF33F5', '#33D4FF', '#D4FF33', '#FF7F33',
  '#33A1D4', '#A1D4FF', '#FF337F', '#33FFA1', '#FFA133',
  '#33FFD4', '#D4A1FF', '#7F33FF', '#FF9933', '#33CCFF'
]