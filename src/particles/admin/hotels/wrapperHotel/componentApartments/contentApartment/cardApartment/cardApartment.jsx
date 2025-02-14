import React from "react";
import Image from "next/image";

import {
    ClassicField,
    FileField,
    InputField,
    TextAreaField
} from "../../../../../../../components/ui/admin/fields/fieldsAdmin";
import {AdminButton} from "../../../../../../../components/ui/admin/buttons/buttons";

import iconQuestion from "../../../../../../../../public/question.png";

import styles from "./cardApartment.module.css";
import stylesFontI from "../../../../../../../styles/fonts/inter.module.css";
import stylesFontT from "../../../../../../../styles/fonts/timesNewRoman.module.css";

export const CardApartment = ({
                                                currentApartment,
                                                fields,
                                                toggleStateHelpText,
                                                handleFieldChange,
                                                indexShowHelp,
                                                handleCancel,
                                                handleSave
                                            }) => (
    <>
        <p className={`${stylesFontT.newRoman700} ${styles.title}`}>{currentApartment.apartment_name}</p>
        {fields && fields.map((field, i) => {
            return (
                <div key={i} className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
                    <div className={styles.rowField}>
                        <div className={styles.boxValue}>
                            <Image alt={'?'} src={iconQuestion}
                                   onClick={() => toggleStateHelpText(i)}
                                   className={styles.icon}/>
                            <p className={styles.label}>{field.label}</p>
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
        <div className={styles.containerBtns}>
            <AdminButton text={'Отмена'} handleClick={handleCancel}/>
            <AdminButton text={'Сохранить'} type={'save'} handleClick={handleSave}/>
        </div>
    </>
);

const renderField = (field, handleFieldChange) => {
    switch (field.typeField) {
        case 'input' :
            if (field.type === 'file') {
                return <FileField field={field} onChange={handleFieldChange}/>;
            } else {
                return <InputField field={field} onChange={handleFieldChange}/>
            }
        case 'textarea':
            return <TextAreaField field={field} onChange={handleFieldChange}/>;
        case 'div':
            const textClassicField = field.name === 'rent_all_house'
                ? field.value === 1 ? 'да' : 'нет'
                : field.value
            return <ClassicField text={textClassicField || '--'}/>
    }
}