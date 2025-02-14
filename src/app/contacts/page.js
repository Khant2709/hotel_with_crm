import React from "react";

import {getDataToPage} from "../../particles/pageContacts/getDataToPage";
import WrapperContactsPage from "../../particles/pageContacts/wrapperContactsPage";

import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {jsonLDContactsPage} from "../../data/seoData";
import {metaDataContactsPage} from "../../data/metaData";

/** Мета данные страницы контактов */
export const metadata = metaDataContactsPage;

/** Основной (серверный компонент) страницы контактов
 * @returns {JSX.Element} - Компонент обернтку страницы контактов.
 * */
export default async function ContactsPage() {
    const {hotelsData, currentHotelData} = await getDataToPage();

    const checkHotelData = hotelsData && hotelsData.status === 200 && hotelsData.data.length > 0;
    const checkCurrentHotelData = currentHotelData && currentHotelData.status === 200;

    if (!checkHotelData || !checkCurrentHotelData) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Contacts"}
            error={hotelsData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDContactsPage)}}
            />
            <WrapperContactsPage ssrData={{hotelsData: hotelsData.data, currentHotelData: currentHotelData.data}}/>
        </section>
    );
}
