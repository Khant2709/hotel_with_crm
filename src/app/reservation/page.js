import React from "react";

import WrapperAllHotelsApartments from "../../particles/pageReservation/wrapperAllHotelsApartments";
import {getInitialHotelData} from "../../particles/pageReservation/getDataToPage";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {metaDataReservationAllPage} from "../../data/metaData";
import {jsonLDReservationAllPage} from "../../data/seoData";

/** Мета данные страницы контактов */
export const metadata = metaDataReservationAllPage;

/** Основной (серверный компонент) страницы всех отелей и их номеров.
 * @returns {JSX.Element} - Компонент страницы всех отелей и их номеров.
 * */
export default async function pageAllHotelsApartments() {
    const {hotelsData, apartmentsData} = await getInitialHotelData();

    const isDataValid = (data) => data && data.status === 200 && data.data.length > 0;

    if (!isDataValid(hotelsData) || !isDataValid(apartmentsData)) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Reservation"}
            error={hotelsData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLDReservationAllPage),
                }}
            />
            <WrapperAllHotelsApartments allHotels={hotelsData?.data} allApartments={apartmentsData.data}/>
        </section>
    );
};

