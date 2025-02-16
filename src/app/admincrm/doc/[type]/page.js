'use client'

import React, {useCallback} from 'react';

import BookingContent from "../../../../particles/admin/doc/pagesDoc/bookingContent";
import CurrentBookingContent from "../../../../particles/admin/doc/pagesDoc/currentBookingContent";
import HotelDataContent from "../../../../particles/admin/doc/pagesDoc/hotelDataContent";
import HotelImageContent from "../../../../particles/admin/doc/pagesDoc/hotelImageContent";
import FaqContent from "../../../../particles/admin/doc/pagesDoc/faqContent";
import ArticleContent from "../../../../particles/admin/doc/pagesDoc/articleCreateContent";
import FinanceContent from "../../../../particles/admin/doc/pagesDoc/financeContent";
import ClientsContent from "../../../../particles/admin/doc/pagesDoc/clientsContent";
import CreateAdminContent from "../../../../particles/admin/doc/pagesDoc/createAdminContent";
import TableBookingContent from "../../../../particles/admin/doc/pagesDoc/tableBookingContent";

import WrapperAdminsPages from "../../../../components/layout/wrapperAdminsPages/wrapperAdminsPages";

import {useRedirectAdmin} from "../../../../hooks/useRedirectAdmin";
import ApartmentsContent from "../../../../particles/admin/doc/pagesDoc/apartmentsContent";
import ConstructorContent from "../../../../particles/admin/doc/pagesDoc/constructorContent";
import ImageContent from "../../../../particles/admin/doc/pagesDoc/imageContent";



const titles = {
    "constructor": "Конструктор карт",
    "image": "Работа с изображениями",
    "booking": "Страницы броней",
    "currentbooking": "Конкретная бронь",
    "hoteldata": "Данные/контакты отеля",
    "faq": "FAQ отеля",
    "apartments": "Номера отеля",
    "article": "Работа со статьями",
    "finance": "Финансы",
    "clients": "Клиенты",
    "createadmin": "Создание администратора",
    "tablebooking": "Таблицы ушедших броней",
};

const BookingDocPage = ({params: {type}}) => {
    useRedirectAdmin();

    const renderContent = useCallback(() => {
        switch (type) {
            case 'constructor':
                return <ConstructorContent/>;
            case 'image':
                return <ImageContent/>;
            case 'booking':
                return <BookingContent/>;
            case 'currentbooking':
                return <CurrentBookingContent/>;
            case 'hoteldata':
                return <HotelDataContent/>;
            case 'hotelimage':
                return <HotelImageContent/>;
            case 'faq':
                return <FaqContent/>;
            case 'apartments':
                return <ApartmentsContent/>;
            case 'article':
                return <ArticleContent/>;
            case 'finance':
                return <FinanceContent/>;
            case 'clients':
                return <ClientsContent/>;
            case 'createadmin':
                return <CreateAdminContent/>;
            case 'tablebooking':
                return <TableBookingContent/>;
        }
    }, [type]);

    return (
        <WrapperAdminsPages title={titles[type] || 'ошибка'}>
            {renderContent()}
        </WrapperAdminsPages>
    );
};

export default BookingDocPage;