import React from 'react';
import Image from "next/image";

import {ClassicField, InputField, TextAreaField} from "../../../../../../components/ui/admin/fields/fieldsAdmin";
import {AdminButton} from "../../../../../../components/ui/admin/buttons/buttons";

import iconQuestion from "../../../../../../../public/question.png";

import styles from './contentHotelAdContacts.module.css';
import stylesFontT from "../../../../../../styles/fonts/timesNewRoman.module.css";
import stylesFontI from "../../../../../../styles/fonts/inter.module.css";

const ContentHotelAdContacts = ({
                                    fields,
                                    handleToggleHelpText,
                                    handleFieldChange,
                                    indexShowHelp,
                                    handleUpdateHotelData,
                                    title
                                }) => (
    <div className={styles.wrapperMain}>
        <p className={`${stylesFontT.newRoman700} ${styles.title}`}>{title}</p>
        {fields.map((field, i) => {
            return (
                <div key={field.name} className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
                    <div className={styles.rowField}>
                        <div className={styles.boxValue}>
                            <Image alt={'?'} src={iconQuestion}
                                   onClick={() => handleToggleHelpText(i)}
                                   className={styles.icon}/>
                            <p className={styles.label}>
                                {field.label}
                            </p>
                        </div>
                        {renderField(field, handleFieldChange)}
                    </div>

                    {field.errorText &&
                    <p className={`${stylesFontI.Inter300} ${styles.errorText}`}>
                        {field.errorText || 'Ошибка'}
                    </p>}
                    {indexShowHelp.includes(i) &&
                    <p className={`${stylesFontI.Inter300} ${styles.helpText}`}>
                        {field.helpText}
                    </p>}
                </div>
            )
        })}
        <AdminButton text={'Сохранить'} type={'save'} handleClick={handleUpdateHotelData}/>
    </div>
);

export default ContentHotelAdContacts;

const renderField = (field, handleFieldChange) => {
    switch (field.typeField) {
        case 'input':
            return <InputField field={field} onChange={handleFieldChange}/>;
        case 'textarea':
            return <TextAreaField field={field} onChange={handleFieldChange}/>;
        case 'div':
            return <ClassicField text={field.value || '--'}/>;
        default:
            return null;
    }
};
