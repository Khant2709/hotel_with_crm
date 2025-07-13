import styles from './fieldsAdmin.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';

/** Компонент поля ввода. */
export const InputField = ({field, onChange}) => (
    <input type={field.type}
           placeholder={field.placeholder}
           name={field.name}
           value={field.value}
           onChange={onChange}
           className={`${stylesFont.newRoman400} ${styles.input}`}
    />
);

/** Компонент текстовой области.*/
export const TextAreaField = ({field, onChange}) => (
    <textarea placeholder={field.placeholder}
              name={field.name}
              value={field.value}
              onChange={onChange}
              className={`${stylesFont.newRoman400} ${styles.textarea}`}
    />
);

/** Компонент выпадающего списка.*/
export const SelectField = ({field, onChange}) => (
    <select name={field.name}
            value={field.value}
            onChange={onChange}
            className={`${stylesFont.newRoman400} ${styles.input}`}>
        {field.options.map((option, i) => {
            return <option key={i} value={option.value}>{option.view}</option>
        })}
    </select>
);

/** Компонент текстового поля. */
export const ClassicField = ({text}) => (
    <p className={`${stylesFont.newRoman400} ${styles.classic}`}>
        {text}
    </p>
);

/** Компонент поля для загрузки файла.*/
export const FileField = ({field, onChange}) => (
    <div className={styles.fileInputWrapper}>
        <input
            type="file"
            name={field.name}
            onChange={(e) => onChange(e, 'file')}
            className={`${stylesFont.newRoman400} ${styles.fileInput}`}
            accept="image/webp"
        />
        {field.value && <ClassicFieldImage field={field}/>}
    </div>
);

/** Компонент для отображения текущего изображения.*/
export const ClassicFieldImage = ({field}) => (
    <div className={styles.previewWrapper}>
        <p className={stylesFont.newRoman400}>
            Текущее изображение: {field.value.split('/').pop()}
        </p>
        <img src={field.value}
             alt="Preview"
             className={styles.previewImage}
        />
    </div>
)