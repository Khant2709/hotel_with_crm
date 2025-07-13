'use client'

import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/navigation";

import ContainerFields from "../../../../particles/admin/bookingCurrent/containerFields/containerFields";
import ContainerBtns from "../../../../particles/admin/bookingCurrent/containerBtns/containerBtns";
import {fieldsConfig} from "../../../../particles/admin/bookingCurrent/fieldsConfig";

import TitleAdmin from "../../../../components/ui/admin/titleAdmin/titleAdmin";

import {useRedirectAdmin} from "../../../../hooks/useRedirectAdmin";
import {useHotelsAndApartments} from "../../../../hooks/useGetDataHotelsAndApartments";

import {auth, booking, reservation} from "../../../../services/api";

import {notifyShowToast} from "../../../../utils/showToast";
import {handleFieldsChange} from "../../../../utils/admin/adminHandleFieldChange";

import styles from '../../../../styles/pageAdmin/bookingCurrentPage/bookingCurrentPage.module.css';
import {singleRequest} from "../../../../services/utils/requestUtils";
import ContainerButtons from "../../../../particles/admin/bookingCurrent/containerBtns/containerButtons";


const BookingCurrentPage = ({params: {id}}) => {
    useRedirectAdmin();
    const router = useRouter();
    const {hotels, apartments} = useHotelsAndApartments();
    const [mode, setMode] = useState("view");
    const [defaultFields, setDefaultFields] = useState(null);
    const [fields, setFields] = useState(fieldsConfig);

    useEffect(() => {
        if (!hotels.length || !apartments.length) return;

        const fetchBooking = async () => {
            const responseBookings = await booking.getCurrentBooking(id);
            if (responseBookings.status < 300) {
                const bookingData = responseBookings.data.data[0];
                // Обновляем value в конфигурации полей
                const updatedFields = fields.map((field) => {

                    if (field.name === 'hotel_id') {
                        const currentHotel = hotels.find(hotel => hotel.id === +bookingData[field.name]);
                        return {
                            ...field,
                            value: bookingData[field.name] || field.value,
                            optionValue: currentHotel.name || field.value,
                        }
                    }

                    if (field.name === 'apartment_id') {
                        const currentApartment = apartments.find(apartment => apartment.id === +bookingData[field.name]);
                        return {
                            ...field,
                            value: bookingData[field.name] || field.value,
                            optionValue: currentApartment.apartment_name || field.value,
                        }
                    }

                    return {
                        ...field,
                        value: bookingData[field.name] || field.value,
                    }
                });

                setDefaultFields(updatedFields);
                setFields(updatedFields);
            } else {
                notifyShowToast(
                    "error",
                    responseBookings?.response?.errorText ||
                    "Произошла ошибка при получении броней, обновите страницу или попробуйте по позже."
                );
                router.back()
            }
        };

        fetchBooking();
    }, [apartments, hotels, id, router]);

    useEffect(() => {
        if (mode !== 'edit') return;

        const currentHotelId = fields.find(field => field.name === 'hotel_id')?.value;
        const currentApartmentId = fields.find(field => field.name === 'apartment_id')?.value;

        // Если hotel_id сменился вручную (а не при загрузке), сбрасываем apartment_id
        const apartmentsFromHotel = apartments.filter(ap => ap.hotel_id === Number(currentHotelId));
        const existsInCurrent = apartmentsFromHotel.some(ap => ap.id === Number(currentApartmentId));

        if (!existsInCurrent && apartmentsFromHotel.length > 0) {
            handleFieldsChange({
                target: {
                    name: 'apartment_id',
                    value: `${apartmentsFromHotel[0].id}`,
                    files: null
                }
            }, 'text', fields, setFields);
        }
    }, [fields.find(field => field.name === 'hotel_id')?.value, mode]);


    const handleFieldChange = (e) => {
        handleFieldsChange(e, 'text', fields, setFields);
    };

    const toggleMode = () => {
        if (mode === 'edit') setFields(defaultFields);
        setMode((prevMode) => (prevMode === "view" ? "edit" : "view"))
    };

    const request = async (type, textRefusal = '') => {
        const adminData = await singleRequest(() => auth.validateToken());

        if (adminData.error) {
            notifyShowToast('error', adminData.error || 'Ваши данные админестратора не получены.');
            return;
        }
        const admin = adminData.data?.data;

        const typeRequest = {
            delete: {
                handle: () => reservation.deleteReservation(id, admin.id, admin.name),
                successMessage: `Бронь ${id} удалена успешно.`
            },
            conclusion: {
                handle: () => reservation.conclusionReservation(id, admin.name),
                successMessage: `Бронь ${id} успешно завершена.`
            },
            refusal: {
                handle: () => {
                    if (!textRefusal.trim()) {
                        notifyShowToast('error', 'Текст для отмены брони обязателен и не должен состоять только из пробелов.');
                        return null; // Прерываем выполнение запроса
                    }
                    return reservation.refusalReservation(id, {
                        confirmedBy: admin.name,
                        refusal_response: textRefusal
                    });
                },
                successMessage: `Бронь ${id} успешно отменена.`
            }
        };

        // Проверяем, существует ли переданный тип запроса
        if (!typeRequest[type]) {
            notifyShowToast('error', 'Тип запроса не найден.');
            return;
        }

        // Отправляем уведомление о начале запроса
        notifyShowToast('info', 'Запрос отправлен.');

        // Выполняем запрос
        const response = await singleRequest(() => typeRequest[type].handle());
        // Если отказ от брони не был отправлен из-за пустого текста — прерываем выполнение
        if (!response) return;

        // Проверяем статус ответа
        if (response.status === 200) {
            router.back();
            notifyShowToast('success', response?.message || typeRequest[type].successMessage);
        } else {
            notifyShowToast('error', response?.error || 'Произошла ошибка при запросе, пожалуйста попробуйте снова.');
        }
    };

    const requestToConfirmOrChange = async () => {
        const adminData = await singleRequest(() => auth.validateToken());

        if (adminData.error) {
            notifyShowToast('error', adminData.error || 'Ваши данные админестратора не получены.');
            return;
        }
        const admin = adminData.data?.data;

        notifyShowToast('info', 'Заявка на подтверждение/изменение брони отправлена.');

        const fieldMapping = {
            status: "CONFIRM",
            confirmedBy: admin.name,
            start_date_local: (val) => val.split("T")[0],
            end_date_local: (val) => val.split("T")[0],
        };

        // Создание объекта data из массива fields
        const data = fields.reduce((acc, field) => {
            if (["reservationTimestamp"].includes(field.name)) {
                return acc;
            }

            acc[field.name] = fieldMapping[field.name]
                ? typeof fieldMapping[field.name] === "function"
                    ? fieldMapping[field.name](field.value)
                    : fieldMapping[field.name]
                : field.value;
            return acc;
        }, {});

        const resultConfirm = await singleRequest(() => reservation.confirmReservation(id, data));

        if (resultConfirm.status === 200) {
            router.back();
            notifyShowToast('success', `Бронь ${id} успешна подтверждена/изменена.`);
        } else {
            notifyShowToast('error', resultConfirm?.error || 'Произошла ошибка при подтверждении/изменении брони, пожалуйста попробуйье снова.');
        }
    }

    const hotelsFilter = useMemo(() => {
        return hotels ? hotels.filter(hotel => hotel.id !== 5) : []
    }, [hotels])

    const apartmentsFilter = useMemo(() => {
        const currentHotelId = fields.find(field => field.name === 'hotel_id').value;
        return apartments ? apartments.filter(apartment => apartment.hotel_id === Number(currentHotelId)) : []
    }, [fields])

    return (
        <div className={styles.wrapper}>
            <TitleAdmin text={`Бронь № ${id}`}/>
            <ContainerFields
                fields={fields}
                mode={mode}
                onChange={handleFieldChange}
                apartments={apartmentsFilter}
                hotels={hotelsFilter}
            />
            <ContainerButtons
                isEdit={mode === 'edit'}
                toggleMode={toggleMode}
                confirmReservation={requestToConfirmOrChange}
                archiveReservation={() => request('conclusion')}
                deleteReservation={() => request('delete')}
                refusalReservation={(text) => request('refusal', text)}
                back={() => router.back()}
            />
        </div>
    );
};

export default BookingCurrentPage;