'use client';

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

import {getPeriodWork} from "../../../utils/getDay";

import ContentWindow from "./contentWindow";

const seasonDates = getPeriodWork(); // Кешируем расчет дат

/** Всплывающее окно вне рабочего сезона */
const WindowWarningOutOfSession = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const today = new Date();
        const start = new Date(seasonDates.startSeason);
        const end = new Date(seasonDates.endSeason);

        const isInSeason = today >= start && today <= end;
        const isFamiliarized = sessionStorage.getItem("familiarized");

        if (!isInSeason && !isFamiliarized) {
            setShowWarning(true);
        }
    }, [pathname]);

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
