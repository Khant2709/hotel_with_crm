'use client'

import React from "react";
import Image from "next/image";

import ButtonSecondary from "../../../buttons/buttonSecondory/buttonSecondory";

import {HOTEL_TYPE} from "../../../../../config/envData";
import {arrowHotel, mainColorHotel, secondaryColorHotel} from "../../../../../config/colorConfig";

import styles from "./componentFaq.module.css";
import stylesFontsI from "../../../../../styles/fonts/inter.module.css";
import stylesFontsT from "../../../../../styles/fonts/timesNewRoman.module.css";


/** Компонент страницы faq
 * @param {object} props - Пропсы компонента.
 * @param {array} props.listFaq - Массив faq.
 * @param {array} props.activeFaq - Массив id активных faq.
 * @param {boolean} props.hasSlice - Нужно ли обрезать вопросы и кнопку (для главной страницы).
 * @param {function} props.router - Навигация для перехода на страницу faq с главной страницы.
 * @param {function} props.toggleFaq - Начальные данные полученные при серверном рендере.
 * @returns {JSX.Element} - Компонент страницы faq.
 * */
const ComponentFaq = ({listFaq, activeFaq, hasSlice, router, toggleFaq}) => (
    <section className={styles.main}>
        <div className={styles.containerQuestions} style={{backgroundColor: `${secondaryColorHotel[HOTEL_TYPE]}`}}>
            <h2 className={`${stylesFontsT.newRoman400} ${styles.title}`}>Вопрос-ответ</h2>
            {listFaq.map(question => {
                const isActive = activeFaq.some(el => el === question.id);
                return <QuestionItem key={question.id} question={question} toggleFaq={toggleFaq} isActive={isActive}/>
            })}
            {hasSlice && <ButtonSecondary text={'Все вопросы'}
                                          hotel={HOTEL_TYPE}
                                          handleClick={() => router.push('/questionlist')}/>}
        </div>
    </section>
);

export default ComponentFaq;

/** Компонент элемента faq
 * @param {object} props - Пропсы компонента.
 * @param {object} props.question - Обьект с данными faq.
 * @param {boolean} props.isActive - Показать ответ на конкретный вопрос.
 * @param {function} props.toggleFaq - Функция для показа/скрытия faq.
 * @returns {JSX.Element} - Компонент элемента faq.
 * */
const QuestionItem = ({question, isActive, toggleFaq}) => {
    const styleBorderWrapper = {borderBottom: `2px solid ${mainColorHotel[HOTEL_TYPE]}`};
    const srcArrow = arrowHotel[HOTEL_TYPE];
    const styleTransformArrow = {transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)'};

    return (
        <div className={styles.wrapperQuestion} style={styleBorderWrapper}>
            <div className={styles.containerLine}>
                <p className={stylesFontsI.Inter700}>{question.question}</p>
                <Image
                    alt="icon"
                    src={srcArrow}
                    className={styles.vectorShow}
                    style={styleTransformArrow}
                    onClick={() => toggleFaq(question.id)}
                />
            </div>
            {isActive && (
                <p className={`${stylesFontsI.Inter300} ${styles.hiddenText}`}>
                    {question.answer}
                </p>
            )}
        </div>
    );
};