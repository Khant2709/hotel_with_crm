import {mainColorHotel} from "../../../config/colorConfig";
import {HOTEL_TYPE} from "../../../config/envData";

const COLOR_BORDER = {borderColor: `${mainColorHotel[HOTEL_TYPE]}`};

export const getFormFields = (dataReservation, handleChange, colorLabel) => [
    {
        label: "Дата заезда:",
        name: "startDate",
        type: "date",
        value: dataReservation.startDate,
        onChange: handleChange,
        colorLabel: colorLabel,
        colorBorder: COLOR_BORDER,
    },
    {
        label: "Дата выезда:",
        name: "endDate",
        type: "date",
        value: dataReservation.endDate,
        onChange: handleChange,
        colorLabel: colorLabel,
        colorBorder: COLOR_BORDER,
    },
    {
        label: "Кол. взрослых:",
        name: "countAdults",
        type: "select",
        maxValue: 16,
        value: dataReservation.countAdults,
        onChange: handleChange,
        colorLabel: colorLabel,
        colorBorder: COLOR_BORDER,
    },
    {
        label: "Кол. детей:",
        name: "countChildren",
        type: "select",
        maxValue: 16,
        value: dataReservation.countChildren,
        onChange: handleChange,
        colorLabel: colorLabel,
        colorBorder: COLOR_BORDER,
    },
];