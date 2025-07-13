import React from "react";

import WrapperAllHotelsApartments from "../../particles/pageReservation/wrapperAllHotelsApartments";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {hotelsAPI, apartmentsAPI} from "../../services/api";
import {batchRequest} from "../../services/utils/requestUtils";

import {metaDataReservationAllPage} from "../../data/metaData";
import {jsonLDReservationAllPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";


export const metadata = metaDataReservationAllPage;


async function fetchData() {
    const data = {
        hotelsData: null,
        apartmentsData: null,
    };

    const request = [
        () => hotelsAPI.getMainHotelsData(TIME_CASH["60min"]),
        () => apartmentsAPI.getAllApartments(TIME_CASH["60min"])
    ];

    return await batchRequest(data, request);
}


/** Основной (серверный компонент) страницы всех отелей и их номеров. */
export default async function pageAllHotelsApartments() {
    const {hotelsData, apartmentsData} = await fetchData();

    if (hotelsData.status !== 200 || apartmentsData.status !== 200) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Reservation"}
            error={hotelsData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    const hotels = hotelsData.data.data;
    const apartments = apartmentsData.data.data;
    const jsonLD = jsonLDReservationAllPage(apartments)

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLD)}}
            />
            <WrapperAllHotelsApartments allHotels={hotels} allApartments={apartments}/>
        </section>
    );
};

export const revalidate = TIME_CASH["60min"] / 1000;