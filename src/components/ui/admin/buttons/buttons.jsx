import styles from './buttons.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';

/**
 * Компонент кнопки для административной панели.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.type - Тип кнопки (например, "save", "delete", "archive", "light").
 * @param {string} props.text - Текст кнопки.
 * @param {Function} props.handleClick - Функция, вызываемая при клике на кнопку.
 * @returns {JSX.Element} - Компонент кнопки для административной панели.
 */
export const AdminButton = ({type, text, handleClick}) => {
    const styleBtn = {
        'save' : `${styles.saveBtn}`,
        'delete' : `${styles.deleteBtn}`,
        'archive' : `${styles.archiveBtn}`,
        'light' : `${styles.lightBtn}`,
    };

    return (
        <button onClick={handleClick}
                className={`${stylesFont.newRoman400} ${styles.baseBtn} ${styleBtn[type] || ''}`}>
            {text}
        </button>
    )
};