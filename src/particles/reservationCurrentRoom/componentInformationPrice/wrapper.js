import { ContentInformationPrice } from "./contentInformationPrice/contentInformationPrice";

import { PERIODS_MONTH_DAY } from "../../../config/envData";

const formatDate = (date) => date.replace("-", ".");

/** Компонент информации цены номера за сутки в зависимости от дат
 * @param {object} props - Пропсы компонента.
 * @param {array} props.prices - Список цен взависимости от периода дат.
 * @return {JSX.Element} - Компонент информации цены номера.
 * */
const WrapperInformationPrice = ({ prices }) => {
  if (!prices || prices.length === 0) return null;

  const periods = Object.values(PERIODS_MONTH_DAY).map((period, index) => ({
    startDate: formatDate(period.startDate),
    endDate: formatDate(period.endDate),
    priceIndex: index,
  }));

  return (
      <ContentInformationPrice
          periodsDate={periods}
          pricesByPeriod={prices}
          dateStartWork={periods[0]?.startDate}
          dateEndWork={periods[periods.length - 1]?.endDate}
      />
  );
};

export default WrapperInformationPrice;