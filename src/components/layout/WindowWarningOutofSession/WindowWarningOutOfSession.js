'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import {getDayStartSeason} from "../../../utils/getDay";

import ContentWindow from "./contentWindow";

const seasonDates = getDayStartSeason(); // Кешируем расчет дат

/**
 * Всплывающее окно вне рабочего сезона.
 * @returns {JSX.Element} - Футер сайта.
 */
const WindowWarningOutOfSession = () => {
    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const familiarized = sessionStorage.getItem("familiarized");
        setShowWarning(familiarized !== 'Y');

    }, [router])

    const handleClose = () => {
        sessionStorage.setItem("familiarized", "Y");
        setShowWarning(false);
    };

    const handleViewRooms = () => {
        handleClose();
        router.push("/reservation");
    };

    if (!showWarning) return null;

    return (
        <ContentWindow handleClose={handleClose}
                       handleViewRooms={handleViewRooms}
                       {...seasonDates}
        />
    );
};

export default WindowWarningOutOfSession;
