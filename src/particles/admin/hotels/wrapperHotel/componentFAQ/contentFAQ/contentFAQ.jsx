import React from 'react';

import {InputField, TextAreaField} from "../../../../../../components/ui/admin/fields/fieldsAdmin";
import {AdminButton} from "../../../../../../components/ui/admin/buttons/buttons";

import styles from "./contentFAQ.module.css";
import stylesFontT from "../../../../../../styles/fonts/timesNewRoman.module.css";

const ContentFaq = ({
                        isCreate,
                        fields,
                        handleFieldChange,
                        sendEditor,
                        faqList,
                        indexEditField,
                        toggleEditMode
                    }) => {
    return (
        <div className={styles.wrapperMain}>
            <p className={`${stylesFontT.newRoman700} ${styles.title}`}>FAQ отеля (редактирование)</p>
            {isCreate
                ? <WrapperField fields={fields}
                                mode={isCreate}
                                handleFieldChange={handleFieldChange}
                                handleEdit={() => toggleEditMode(null, null, true)}
                                handleSave={() => sendEditor('create')}
                />
                : <AdminButton text={'Создать новый'} type={'archive'}
                               handleClick={() => toggleEditMode(null, null, true)}/>
            }
            {faqList.map(el => {
                const modeIsEdit = el.id === indexEditField;
                return (
                    <WrapperField key={el.id}
                                  fields={fields}
                                  faqValues={el}
                                  mode={modeIsEdit}
                                  handleFieldChange={handleFieldChange}
                                  handleEdit={modeIsEdit ? toggleEditMode : () => toggleEditMode(el.id, el)}
                                  handleSave={() => sendEditor('update')}
                                  handleDelete={() => sendEditor('delete')}
                                  hasDelete={true}
                    />
                )
            })}
        </div>
    );
};

export default ContentFaq;

const WrapperField = ({
                          fields,
                          faqValues,
                          mode,
                          handleFieldChange,
                          handleEdit,
                          handleSave,
                          hasDelete,
                          handleDelete
                      }) => (
    <div className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
        {fields.map((fieldFaq, i) => {
            return <div
                className={`${fieldFaq.name !== 'priority' ? styles.containerField : styles.rowField}`}
                key={`${fieldFaq.name}_${i}`}>
                <p className={styles.label}>{fieldFaq.label}</p>
                {mode
                    ? fieldFaq.typeField === 'textarea'
                        ? <TextAreaField field={fieldFaq} onChange={handleFieldChange}/>
                        : <InputField field={fieldFaq} onChange={handleFieldChange}/>
                    : <p className={styles.text}>{faqValues[fieldFaq.name] || '--'}</p>
                }
            </div>
        })}
        <div className={styles.wrapperBtns}>
            <AdminButton text={mode ? 'Отмена' : 'Изменить'}
                         handleClick={handleEdit}
                         type={'archive'}/>
            {mode && <AdminButton text={'Сохранить'} type={'save'} handleClick={handleSave}/>}
            {mode && hasDelete && <AdminButton text={'Удалить'} type={'delete'} handleClick={handleDelete}/>}
        </div>
    </div>
);