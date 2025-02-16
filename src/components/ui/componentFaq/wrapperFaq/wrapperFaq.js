'use client'

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import ComponentFaq from './componentFaq/componentFaq.jsx';

import {getDataToPage} from "../../../../particles/pageFAQ/getDataToPage";
import {notifyShowToast} from "../../../../utils/showToast";


/** Функция для получения данных для страницы
 * @param {function} setCurrentData - обработчик данных
 * */
const getFreshData = async (setCurrentData) => {
    const {faqData} = await getDataToPage();

    if (faqData && faqData.status === 200) {
        setCurrentData({faqData: faqData.data});
    } else {
        notifyShowToast('error', 'Произошла ошибка при обновлении данных блока FAQ, пожалуйста перезагрузите страницу или зайдите позднее.');
    }
};

/** Компонент обертка для страницы faq
 * @param {object} props - Пропсы компонента.
 * @param {object} props.ssrData - Начальные данные полученные при серверном рендере.
 * @returns {JSX.Element} - Компонент страницы faq.
 * */
const WrapperFaq = ({ssrData, hasSlice}) => {
    const router = useRouter();
    const [currentData, setCurrentData] = useState(ssrData);
    const [activeFaq, setActiveFaq] = useState([]);

    useEffect(() => {
        getFreshData(setCurrentData);
    }, []);

    /** Функция для открытия ответа на вопрос */
    const toggleFaq = (id) => {
        const isActiveFaq = activeFaq.includes(id);

        if (isActiveFaq) {
            setActiveFaq((prev) => prev.filter(el => el !== id));
        } else {
            setActiveFaq([...activeFaq, id]);
        }
    };

    if (!currentData?.faqData || currentData.faqData.length === 0) return null;

    const listFaq = hasSlice ? currentData.faqData.slice(0, 7) : currentData.faqData;

    return (
        <ComponentFaq listFaq={listFaq}
                      activeFaq={activeFaq}
                      hasSlice={hasSlice}
                      router={router}
                      toggleFaq={toggleFaq}
        />
    )
};

export default WrapperFaq;