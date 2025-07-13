'use client'

import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/navigation";

import WrapperAdminPage from "../../../components/ui/admin/wrapperAdminPage/wrapperAdminPage";
import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";
import {handleFieldsChange} from "../../../utils/admin/adminHandleFieldChange";
import ContainerCreateFields from "../../../particles/admin/bookingCreate/containerFields/containerCreateFields";
import {fieldsConfig} from "../../../particles/admin/bookingCreate/fieldsConfig";

import {authAPI, hotelsAPI, apartmentsAPI, reservation} from '../../../services/api';
import {batchRequest, singleRequest} from "../../../services/utils/requestUtils";
import {TIME_CASH} from "../../../config/envData";
import {AdminButton} from "../../../components/ui/admin/buttons/buttons";
import {notifyShowToast} from "../../../utils/showToast";

const fetchData = async () => {
    const initial = {
        hotelsData: null,
        apartmentsData: null,
        adminData: null,
    }

    const request = [
        () => hotelsAPI.getMainHotelsData(TIME_CASH["60min"]),
        () => apartmentsAPI.getAllApartments(TIME_CASH["60min"]),
        () => authAPI.validateToken(),
    ];

    return await batchRequest(initial, request);
}

const CreateBookingAdminPage = () => {
    useRedirectAdmin();
    const router = useRouter();

    const [fields, setFields] = useState(fieldsConfig);
    const [data, setData] = useState({hotels: [], apartments: []});
    const [errorReq, setErrorReq] = useState(null);


    useEffect(() => {
        const getData = async () => {
            const {hotelsData, apartmentsData, adminData} = await fetchData();

            if (hotelsData.status !== 200 || apartmentsData.status !== 200 || adminData.status !== 200) {
                setErrorReq('Произошла ошибка при получении данных.');
                return;
            }

            const hotelsRes = hotelsData.data?.data || [];
            const apartmentsRes = apartmentsData.data?.data || [];
            const adminRes = adminData.data?.data

            setData({hotels: hotelsRes, apartments: apartmentsRes});

            const updateFields = fields.map(field => {
                switch (field.name) {
                    case 'confirmedBy':
                        return {...field, value: adminRes.name}
                    default:
                        return field
                }
            });

            setFields(updateFields);
        }
        getData()
    }, [router])

    useEffect(() => {
        const currentHotelId = fields.find(field => field.name === 'hotel_id')?.value;
        if (!currentHotelId) return;

        const apartment = data.apartments.find(ap => ap.hotel_id === Number(currentHotelId));
        if (apartment) {
            handleFieldsChange({
                target: {
                    name: 'apartment_id',
                    value: `${apartment.id}`,
                    files: null
                }
            }, 'text', fields, setFields);
        }
    }, [fields.find(field => field.name === 'hotel_id')?.value]);

    const handleFieldChange = (e) => {
        handleFieldsChange(e, 'text', fields, setFields);
    };

    const apartmentsFilter = useMemo(() => {
        const currentHotelId = fields.find(field => field.name === 'hotel_id').value;
        return data.apartments.filter(apartment => apartment.hotel_id === Number(currentHotelId))
    }, [fields, data])

    const createReservation = async () => {
        const fieldMapping = {
            status: "CONFIRM",
            start_date_local: (val) => val.split("T")[0],
            end_date_local: (val) => val.split("T")[0],
        };

        // Создание объекта data из массива fields
        const data = fields.reduce((acc, field) => {
            // if (["reservationTimestamp", "hotel_id", "apartment_id"].includes(field.name)) {
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

        const resultConfirm = await singleRequest(() => reservation.createReservation(data));
        if (resultConfirm.status === 200) {
            router.back();
            notifyShowToast('success', resultConfirm.data?.message || `Бронь успешна создана.`);
        } else {
            notifyShowToast('error', resultConfirm?.error || 'Произошла ошибка при создании брони, пожалуйста попробуйье снова.');
        }
    }

    return (
        <WrapperAdminPage title={'Новая бронь'}>
            <ContainerCreateFields
                fields={fields}
                mode={"edit"}
                onChange={handleFieldChange}
                apartments={apartmentsFilter}
                hotels={data.hotels}
            />
            <AdminButton type={'save'} text={'создать'} handleClick={createReservation}/>
        </WrapperAdminPage>
    );
};

export default CreateBookingAdminPage;