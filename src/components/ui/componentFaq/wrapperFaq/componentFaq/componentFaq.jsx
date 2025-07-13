'use client'

import React from "react";
import Image from "next/image";

import ButtonSecondary from "../../../buttons/buttonSecondory/buttonSecondory";

import {HOTEL_TYPE} from "../../../../../config/envData";
import {arrowHotel, mainColorHotel, secondaryColorHotel} from "../../../../../config/colorConfig";

import styles from "./componentFaq.module.css";
import stylesFontsI from "../../../../../styles/fonts/inter.module.css";
import stylesFontsT from "../../../../../styles/fonts/timesNewRoman.module.css";


/** Компонент страницы faq */
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

/** Компонент элемента faq */
const QuestionItem = ({question, isActive, toggleFaq}) => {
    const styleBorderWrapper = {borderBottom: `2px solid ${mainColorHotel[HOTEL_TYPE]}`};
    const srcArrow = arrowHotel[HOTEL_TYPE];
    const styleTransformArrow = {transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)'};

    return (
        <div className={styles.wrapperQuestion} style={styleBorderWrapper} onClick={() => toggleFaq(question.id)}>
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