import {AdminButton} from "../../../../components/ui/admin/buttons/buttons";

import styles from "./containerBtns.module.css";
import stylesFont from "../../../../styles/fonts/timesNewRoman.module.css";

const ButtonConfirm = ({onConfirm, onCancel}) => (
    <div className={styles.containerBtnConfirm}>
        <AdminButton text={'Да'} type={'save'} handleClick={onConfirm} />
        <AdminButton text={'Нет'} type={'delete'} handleClick={onCancel} />
    </div>
);


export const ConfirmDialog = ({ text, onConfirm, onCancel }) => (
    <div className={styles.containerConfirm}>
        <p className={stylesFont.newRoman700}>{text}</p>
        <ButtonConfirm onConfirm={onConfirm} onCancel={onCancel}/>
    </div>
);

export const RefusalDialog = ({ value, onChange, onConfirm, onCancel }) => (
    <div className={styles.containerConfirm}>
        <p className={stylesFont.newRoman700}>
            Напишите текст, который отправится гостю в сообщении с отменой его брони.
        </p>
        <textarea
            placeholder={'Текст который отправится гостю.'}
            value={value}
            onChange={onChange}
            className={styles.textArea}
        />
        <ButtonConfirm onConfirm={onConfirm} onCancel={onCancel}/>
    </div>
);