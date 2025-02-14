'use client';

import React, {useReducer, useCallback, useMemo} from 'react';

import {AdminButton} from '../../../../components/ui/admin/buttons/buttons';

import {ConfirmDialog, RefusalDialog} from './componentsBtns';

import styles from './containerBtns.module.css';

// Типы действий для useReducer
const ACTIONS = {
    OPEN_CONFIRM: 'OPEN_CONFIRM',
    CLOSE_CONFIRM: 'CLOSE_CONFIRM',
    OPEN_REFUSAL: 'OPEN_REFUSAL',
    CLOSE_REFUSAL: 'CLOSE_REFUSAL',
    UPDATE_REFUSAL_TEXT: 'UPDATE_REFUSAL_TEXT'
};

// Редьюсер состояния
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.OPEN_CONFIRM:
            return {...state, confirm: {isActive: true, text: action.text, onConfirm: action.onConfirm}};
        case ACTIONS.CLOSE_CONFIRM:
            return {...state, confirm: {isActive: false, text: '', onConfirm: null}};
        case ACTIONS.OPEN_REFUSAL:
            return {...state, refusal: {isActive: true, text: ''}};
        case ACTIONS.CLOSE_REFUSAL:
            return {...state, refusal: {isActive: false, text: ''}};
        case ACTIONS.UPDATE_REFUSAL_TEXT:
            return {...state, refusal: {...state.refusal, text: action.text}};
        default:
            return state;
    }
};

const initialState = {
    confirm: {isActive: false, text: '', onConfirm: null},
    refusal: {isActive: false, text: ''}
};

const ContainerBtns = ({
                           isEdit,
                           toggleMode,
                           deleteReservation,
                           archiveReservation,
                           refusalReservation,
                           confirmReservation
                       }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleConfirm = useCallback((text, onConfirm) => {
        dispatch({type: ACTIONS.OPEN_CONFIRM, text, onConfirm});
    }, []);

    const handleRefusal = useCallback(() => {
        dispatch({type: ACTIONS.OPEN_REFUSAL});
    }, []);

    const buttons = useMemo(() => [
        {text: isEdit ? 'Назад' : 'Изменить', type: 'edit', handleClick: toggleMode},
        {text: 'Сохранить', type: 'save', visible: isEdit, handleClick: confirmReservation},
        {
            text: 'Завершить',
            type: 'archive',
            handleClick: () => handleConfirm('Гости завершили проживание? Если да, вы можете завершить.', archiveReservation)
        },
        {
            text: 'Удалить',
            type: 'delete',
            handleClick: () => handleConfirm('Вы действительно хотите удалить бронь?', deleteReservation)
        },
        {text: 'Отменить', type: 'delete', handleClick: handleRefusal}
    ], [isEdit, toggleMode, confirmReservation, archiveReservation, deleteReservation, handleConfirm, handleRefusal]);

    if (state.confirm.isActive) {
        return (
            <ConfirmDialog
                text={state.confirm.text}
                onConfirm={() => {
                    state.confirm.onConfirm();
                    dispatch({type: ACTIONS.CLOSE_CONFIRM});
                }}
                onCancel={() => dispatch({type: ACTIONS.CLOSE_CONFIRM})}
            />
        );
    }

    if (state.refusal.isActive) {
        return (
            <RefusalDialog
                value={state.refusal.text}
                onChange={(e) => dispatch({type: ACTIONS.UPDATE_REFUSAL_TEXT, text: e.target.value})}
                onConfirm={() => {
                    refusalReservation(state.refusal.text);
                    dispatch({type: ACTIONS.CLOSE_REFUSAL});
                }}
                onCancel={() => dispatch({type: ACTIONS.CLOSE_REFUSAL})}
            />
        );
    }

    return (
        <div className={styles.containerBtn}>
            {buttons.map((btn, index) => (btn.visible === undefined || btn.visible) && (
                <AdminButton key={index} text={btn.text} type={btn.type} handleClick={btn.handleClick}/>
            ))}
        </div>
    );
};

export default ContainerBtns;
