'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";

import ComponentFaq from './componentFaq/componentFaq.jsx';


/** Компонент обертка для страницы faq */
const WrapperFaq = ({faq, hasSlice}) => {
    const router = useRouter();
    const [activeFaq, setActiveFaq] = useState([]);

    /** Функция для открытия ответа на вопрос */
    const toggleFaq = (id) => {
        const isActiveFaq = activeFaq.includes(id);

        if (isActiveFaq) {
            setActiveFaq((prev) => prev.filter(el => el !== id));
        } else {
            setActiveFaq([...activeFaq, id]);
        }
    };

    if (!faq || faq.length === 0) return null;

    const listFaq = hasSlice ? faq.slice(0, 7) : faq;

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