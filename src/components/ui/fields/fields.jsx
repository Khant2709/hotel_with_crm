import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";
import styles from "./fields.module.css";
import {formatPhoneNumber} from "../../../utils/mask/transfomNumber";
import React from "react";

export const InputField = ({field, onChange, styleCustom}) => (
    <input type={field.type}
           placeholder={field.placeholder}
           name={field.name}
           value={field.type === 'tel' ? formatPhoneNumber(field.value) : field.value}
           onChange={onChange}
           className={`${stylesFont.newRoman400} ${styles.input} ${styleCustom}`}
    />
);

export const InputFieldCheckbox = ({field, onChange, styleCustom}) => (
    <div className={`${styles.label} ${styleCustom}`}>
        <input type={field.type}
               value={field.value}
               onChange={onChange}
        />
        <label>Согласен(а) на обработку персональных данных</label>
    </div>
);

export const TextAreaField = ({field, onChange, styleCustom}) => (
    <textarea placeholder={field.placeholder}
              name={field.name}
              value={field.value}
              onChange={onChange}
              className={`${stylesFont.newRoman400} ${styles.textarea} ${styleCustom}`}
    />
);