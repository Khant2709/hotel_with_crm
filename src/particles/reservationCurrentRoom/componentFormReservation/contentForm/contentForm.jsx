import ButtonSecondary from "../../../../components/ui/buttons/buttonSecondory/buttonSecondory";

import transformPrice from "../../../../utils/mask/transformPrice";

import styles from "./contentForm.module.css";
import stylesFontsT from "../../../../styles/fonts/timesNewRoman.module.css";

export const ContentFormReservation = ({
                                           fields,
                                           hotelNumber,
                                           startReservation,
                                           errorReservation,
                                       }) => (
    <div className={`${stylesFontsT.newRoman400} ${styles.containerForm}`}>
        {fields.map((field, index) => (
            <div className={styles.containerColumn} key={index}>
                <p>{field.label}</p>

                {field.type === "date" && (
                    <input
                        type={field.type}
                        className={stylesFontsT.newRoman400}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}

                {field.type === "select" && (
                    <select
                        className={stylesFontsT.newRoman400}
                        value={field.value}
                        onChange={field.onChange}
                    >
                        <option value={0}>Выбрать</option>
                        {[...Array(field.maxValue)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                )}

                {field.type === "text" && (
                    <div className={styles.containerPrice}>
                        {transformPrice(field.value)}
                    </div>
                )}
            </div>
        ))}
        <ButtonSecondary
            text={"Забронировать"}
            hotel={hotelNumber}
            disabled={errorReservation}
            handleClick={startReservation}
        />
    </div>
);

export const ContentError = ({errorReservation}) => (
    <div className={styles.containerError}>
        {errorReservation &&
        errorReservation.length > 0 &&
        errorReservation.map((error, index) => (
            <p
                className={`${stylesFontsT.newRoman400} ${styles.error}`}
                key={index}
            >
                {error}
            </p>
        ))}
    </div>
);
