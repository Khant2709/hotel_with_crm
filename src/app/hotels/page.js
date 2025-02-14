import React from "react";

import {mataDataHotelsPage} from "../../data/metaData";
import {jsonLDHotelsPage} from "../../data/seoData";

import WrapperHotelPage from "../../particles/pageHotels/wrapperHotelPage";
import {getDataToPage} from "../../particles/pageHotels/getDataToPage";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

/** Мета данные страницы отелей */
export const metadata = mataDataHotelsPage;

/** Основной (серверный компонент) страницы отелей
 * @returns {JSX.Element} - Компонент обернтку страницы отелей.
 * */
export default async function Hotels() {
    const {hotelsData, bannerData} = await getDataToPage();

    const checkHotelData = hotelsData && hotelsData.status === 200 && hotelsData.data.length > 0;

    if (!checkHotelData) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Hotels"}
            error={hotelsData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDHotelsPage)}}
            />
            <WrapperHotelPage ssrData={{hotelsData: hotelsData.data, bannerData: bannerData?.data[0]}}/>
        </section>
    );
}
