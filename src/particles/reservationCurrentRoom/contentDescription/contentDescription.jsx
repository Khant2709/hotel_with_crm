'use client'

import {useState} from "react";
import ReactMarkdown from 'react-markdown';

import styles from "./contentDescription.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

/** Контейнер кратго описания номера.
 * @param {object} props - Пропсы компонента.
 * @param {array} props.shortDescription - Массив с описанием кол. гостей и комнат.
 * @return {JSX.Element} - Компонент описания номера.
 */
export const ShortDescriptionContainer = ({shortDescription}) => (
    <div className={styles.containerList}>
        {shortDescription.map((item) => (
            <div className={styles.wrapperItem} key={item.id}>
                <div className={styles.circle}/>
                <p>
                    {item.count} {item.text}
                </p>
            </div>
        ))}
    </div>
);

/** Контейнер полного описания номера.
 * @param {object} props - Пропсы компонента.
 * @param {array} props.fullDescription - Список заголовков и описания.
 * @param {string} props.borderStyle - Стиль нижней границы.
 * @return {JSX.Element} - Компонент с заголовками и описаниями.
 */
export const FullDescriptionContainer = ({fullDescription, borderStyle}) => (
    <>
        {fullDescription.map((item) => (
            <div className={`${stylesFontsT.newRoman400} ${styles.containerDescriptionHotel}`}
                 style={borderStyle}
                 key={item.id}
            >
                <p className={styles.subTitle}>{item.titleDescription}</p>
                {item.typeDescription === "markDown"
                    ?
                    <MarkdownDescription titleDescription={item.titleDescription} textDescription={item.textDescription}/>
                    : <p className={styles.description}>{item.textDescription}</p>
                }
            </div>
        ))}
    </>
);

/** Контейнер для описания.
 * @param {object} props - Пропсы компонента.
 * @param {string} props.titleDescription - Заголовок раздела.
 * @param {string} props.textDescription - Описание.
 * @return {JSX.Element} - Компонент для описания.
 */
const MarkdownDescription = ({titleDescription, textDescription}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (titleDescription === 'Удобства:') {
        return <>
            <ReactMarkdown className={`${styles.comfort} ${isExpanded ? styles.showFull : styles.showShort}`}>
                {textDescription}
            </ReactMarkdown>

            <p className={styles.miniBtn} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Скрыть' : 'Показать полностью'}
            </p>
        </>
    } else {
        return <ReactMarkdown className={styles.markdown}>{textDescription}</ReactMarkdown>
    }
}