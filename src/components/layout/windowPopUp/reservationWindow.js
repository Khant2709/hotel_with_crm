import React from "react";
import Image from "next/image";

import ButtonSecondary from "../../ui/buttons/buttonSecondory/buttonSecondory";
import {InputField, InputFieldCheckbox, TextAreaField} from "../../ui/fields/fields";

import {HOTEL_TYPE} from "../../../config/envData";

import close from "../../../../public/close.png";

import styles from "./windowPopUp.module.css";
import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";

/** Компонент полей для пользовательской информации с валидацией
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.fields - Массив обьектов полей для пользователя.
 * @param {object} props.fieldCheckbox - Обьектов поля для чекбокса.
 * @param {function} props.handleFieldsChange - Обработчик изменения поля.
 * @param {string} props.hotelName - Название отеля.
 * @param {string} props.apartmentName - Название номера.
 * @param {boolean} props.disableBtn - Прошла ли валидация полей и информации для активации кнопки.
 * @param {function} props.togglePopUpWindow - Функция для закрытия окна.
 * @param {array} props.dataReservationFields - Массив полей с информацией о брони.
 * @param {function} props.sendReservation - Функция для отправки запроса для создания брони.
 * @returns {JSX.Element} - Компонент полей для пользовательской информации.
 */
export const ReservationWindow = ({
                                      fields,
                                      fieldCheckbox,
                                      handleFieldsChange,
                                      hotelName,
                                      apartmentName,
                                      disableBtn,
                                      togglePopUpWindow,
                                      dataReservationFields,
                                      sendReservation,
                                  }) => {
    return (
        <div className={styles.mainWindow}>
            <div className={`${stylesFontT.newRoman400} ${styles.mainContainer}`}>
                <Image alt={"close"} src={close} onClick={togglePopUpWindow}/>
                <h2 className={styles.title}>Забронировать номер</h2>
                <div className={styles.nameHotel}>{hotelName}</div>
                <div className={styles.nameApartment}>{apartmentName}</div>

                <UserFields fields={fields} handleFieldsChange={handleFieldsChange}/>

                <ReservationInformation dataReservationFields={dataReservationFields}/>

                <p className={styles.lastInformation}>
                    * После бронирования, с вами свяжется наш оператор, для подтверждения
                    брони. Необходимо осуществить оплату за сутки проживания (до 7 дней
                    отдыха), за 2 суток проживания (до 14 дней отдыха) и прикрепить чек в
                    переписку, указав ваше ФИО и даты.
                </p>

                <ContainerCheckbox fieldCheckbox={fieldCheckbox} handleFieldsChange={handleFieldsChange}/>

                <ButtonSecondary
                    hotel={HOTEL_TYPE}
                    text={"Забронировать"}
                    handleClick={sendReservation}
                    disabled={disableBtn}
                />
            </div>
        </div>
    );
};

/** Компонент полей для пользовательской информации с валидацией
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.fields - Массив обьектов полей для пользователя.
 * @param {function} props.handleFieldsChange - Обработчик изменения поля.
 * @returns {JSX.Element} - Компонент полей для пользовательской информации.
 */
const UserFields = ({fields, handleFieldsChange}) => (
    <>
        {fields.map((field, i) => {
            if (field.typeField !== "checkbox") {
                const hasError = field.errorText ? styles.error : '';
                return (
                    <React.Fragment key={field.name}>
                        {field.typeField === 'input'
                            ? <InputField field={field}
                                          onChange={handleFieldsChange}
                                          styleCustom={`${hasError} ${styles.inpName}`}
                            />
                            : < TextAreaField field={field}
                                              onChange={handleFieldsChange}
                                              styleCustom={`${hasError} ${styles.textCommit}`}
                            />
                        }
                        {field.errorText && <p className={styles.errorText}>{field.errorText}</p>}
                    </React.Fragment>
                )
            }
        })}
    </>
);


/** Контейнер для чекбокса с выводом ошибки
 * @param {Object} props - Пропсы компонента.
 * @param {object} props.fieldCheckbox - Обьект со свойтвами чекбокса.
 * @param {function} props.handleFieldsChange - Обработчик изменения поля.
 * @returns {JSX.Element} - Контейнер для чекбокса с выводом ошибки.
 */
const ContainerCheckbox = ({fieldCheckbox, handleFieldsChange}) => (
    <>
        <InputFieldCheckbox field={fieldCheckbox}
                            onChange={handleFieldsChange}
                            styleCustom={styles.containerCheckbox}
        />
        {fieldCheckbox.errorText && <p className={styles.errorText}>{fieldCheckbox.errorText}</p>}
    </>
);

/** Компонент с полями информации о брони
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.dataReservationFields - Массив полей с информацией о брони.
 * @returns {JSX.Element} - Компонент с полями информации о брони.
 */
const ReservationInformation = ({dataReservationFields}) => (
    <div className={styles.containerInformation}>
        {dataReservationFields && dataReservationFields.map((el, i) => {
            return (
                <div key={i} className={styles.column}>
                    <label>{el.label}</label>
                    <p>{el.text}</p>
                </div>
            );
        })}
    </div>
);