import React, {useMemo} from 'react';

import {transformDateFormat} from '../../../../utils/getDay';

import styles from './containerFields.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';
import {RESERVATION_STATUS} from "../../../../config/envData";

const groups = [
    {key: 'guest_info', title: 'Данные гостя:'},
    {key: 'booking_info', title: 'Данные брони:'},
    {key: 'admin_info', title: 'Остальные данные:'},
];

const ContainerFields = ({fields, mode, onChange, hotels, apartments}) => {
    const groupedFields = useMemo(() => {
        return groups.map(group => ({
            ...group,
            fields: fields.filter(field => field.group === group.key),
        }));
    }, [fields]);

    return (
        <div className={styles.wrapperFields}>
            {groupedFields.map(({key, title, fields}) => (
                <React.Fragment key={key}>
                    <p className={`${stylesFont.newRoman700} ${styles.subtitle}`}>{title}</p>
                    {fields.map((field, i) => {
                        const isDateField = field.type === 'date';
                        const sliceDate = isDateField && field.value ? field.value.split('T')[0] : '';
                        const transformDate = sliceDate ? transformDateFormat(sliceDate) : '';
                        let divValue;

                        switch (field.name) {
                            case 'hotel_id':
                            case 'apartment_id':
                                divValue = field?.optionValue;
                                break;
                            case 'sendToGuest':
                                divValue = field.value === '1' ? 'Да' : 'Нет'
                                break;
                            case 'status':
                                divValue = RESERVATION_STATUS[field.value];
                                break;
                            default:
                                divValue = field.value;
                        }

                        return (
                            <div className={`${stylesFont.newRoman400} ${styles.rowField}`} key={`${key}_${i}`}>
                                <p className={styles.labelField}>{field.label}</p>
                                {mode === 'view' ? (
                                    <p className={styles.valueField}>{transformDate || divValue || '--'}</p>
                                ) : (
                                    <FieldEdit
                                        field={field}
                                        onChange={onChange}
                                        date={sliceDate}
                                        hotels={hotels}
                                        apartments={apartments}
                                    />
                                )}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default React.memo(ContainerFields);

const FieldEdit = React.memo(({field, onChange, date, hotels, apartments}) => {
    const commonProps = {
        name: field.name,
        value: date || field.value || '',
        onChange,
    };

    if (field.typeField === 'input') {
        return (
            <input
                type={field.type}
                placeholder={field.placeholder}
                className={`${stylesFont.newRoman400} ${styles.inp}`}
                {...commonProps}
            />
        );
    }

    if (field.typeField === 'select') {
        let options;
        switch (field.name) {
            case 'hotel_id':
                options = hotels;
                break;
            case 'apartment_id':
                options = apartments;
                break;
            case 'sendToGuest':
                options = [{id: 0, value: 'Нет'}, {id: 1, value: 'Да'}];
                break;
            default:
                options = [];
                break;
        }
        return (
            <select {...commonProps} className={`${stylesFont.newRoman400} ${styles.selec}`}>
                {options.map(el => (
                    <option key={el.id} value={el.id}>
                        {el?.name || el?.apartment_name || el?.value}
                    </option>
                ))}
            </select>
        );
    }

    if (field.typeField === 'textarea') {
        return <textarea placeholder={field.placeholder} {...commonProps}
                         className={`${stylesFont.newRoman400} ${styles.txtArea}`}/>;
    }

    let divValue;

    switch (field.name) {
        case 'hotel_id':
        case 'apartment_id':
            divValue = field?.optionValue;
            break;
        case 'status':
            divValue = RESERVATION_STATUS[field.value];
            break;
        default:
            divValue = field.value;
    }

    return <p className={`${stylesFont.newRoman400} ${styles.fieldView}`}>{date || divValue || '--'}</p>;
});
FieldEdit.displayName = "FieldEdit";
