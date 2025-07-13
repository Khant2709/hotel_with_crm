'use client'

import React, {useState} from 'react';

import {AdminButton} from "../../../../components/ui/admin/buttons/buttons";
import {ConfirmDialog, RefusalDialog} from "./componentsBtns";

import styles from "./containerBtns.module.css";

const ContainerButtons = ({
                              isEdit,
                              toggleMode,
                              confirmReservation,
                              archiveReservation,
                              deleteReservation,
                              refusalReservation,
                              back
                          }) => {
    const [showNextStep, setShowNextStep] = useState({show: false, isRefusal: false, text: '', onConfirm: null});
    const [refusalText, setRefusalText] = useState('')

    const closeDialog = () => {
        setShowNextStep({show: false, isRefusal: false, text: '', onConfirm: null})
    }

    const nextStep = (type) => {
        if (type === 'conclusion') {
            setShowNextStep({
                show: true,
                isRefusal: false,
                text: 'Гости завершили проживание? Если да, вы можете завершить.',
                onConfirm: archiveReservation
            })
        }

        if (type === 'delete') {
            setShowNextStep({
                show: true,
                isRefusal: false,
                text: 'Вы действительно хотите удалить бронь?',
                onConfirm: deleteReservation
            })
        }

        if (type === 'cancel') {
            setShowNextStep({
                show: true,
                isRefusal: true,
                text: 'Вы действительно хотите удалить бронь?',
                onConfirm: refusalReservation
            })
        }
    }

    if (showNextStep.show && !showNextStep.isRefusal) {
        return <ConfirmDialog text={showNextStep.text} onConfirm={showNextStep.onConfirm} onCancel={closeDialog}/>
    }

    if (showNextStep.show && showNextStep.isRefusal) {
        return <RefusalDialog value={refusalText}
                              onChange={(e) => setRefusalText(e.target.value)}
                              onConfirm={() => showNextStep.onConfirm(refusalText)}
                              onCancel={closeDialog}
        />
    }

    return (
        <div className={styles.containerBtn}>
            <AdminButton handleClick={back} text={'<'}/>
            <AdminButton type={'save'}
                         handleClick={!isEdit ? toggleMode : confirmReservation}
                         text={!isEdit ? 'Изменить' : 'Сохранить'}
            />
            <AdminButton type={'archive'} handleClick={() => nextStep('conclusion')} text={'Завершить'}/>
            <AdminButton type={'delete'} handleClick={() => nextStep('delete')} text={'Удалить'}/>
            <AdminButton type={'delete'} handleClick={() => nextStep('cancel')} text={'Отменить'}/>
        </div>
    );
};

export default ContainerButtons;