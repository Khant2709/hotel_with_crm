import React from 'react';

import styles from './content.module.css';

const CurrentBookingContent = () => {
    return (
        <div className={styles.wrapperContent}>
            <h2>Предисловие:</h2>
            <p>
                На этой странице вы можете ознакомиться с деталями брони и данными гостей. Так же вы можете изменять
                данные бронирования, завершать/отменять/удалять бронь.
            </p>
            <p>
                Главное правило перед подтверждение проверяйте данные которые указаны, и при связи с клиентом уточняйте
                все ли верно заполнено, чтобы избежать не нужных проблем в будущем.
            </p>
            <h2>Изменение/подтверждение брони:</h2>
            <p>
                <strong>Данные гостя - </strong> можно изменять все поля, только учесть что: 1. ФИО - должно состоять из
                трех слов. 2. Телефон - записывается в формате 79991111111 (должно быть 11 цифр, без пробелов и других
                символов). 3. Почта - должна указывать существующая иначе письмо с подтверждение не дойдет до клиента.
            </p>
            <p>
                <strong>Данные брони - </strong> на текущий момент вы можете изменять кол. проживающих (даже прописывать
                больше, чем помещает номер). В ближайшее время точно появиться возможность менять даты заезда и выезда.
            </p>
            <p>
                <strong>Остальные данные - </strong> итоговая сумма не должна быть равна 0, если вы делаете кому либо
                подарок нужно поставить сумму 1. Статус устанавливается автоматически, когда статус ожидает
                подтверждения, вам нужно связаться с клиентом проверить данные, получить предоплату и после сохранить
                внесеные данные и статус сам поменяется на подтвержден. Администратор устанавливается, тот через чей
                аккаунт было выполнено последнее изменение, а в поле дата изменений фиксируется дата (это все
                заполняется автоматически, изменить в ручную нельзя).
            </p>
            <p>
                При любом изменении данных брони, отправляется письмо администратору и гостю на почту.
            </p>

            <h2>Завершение брони:</h2>
            <p>
                Когда гость закончит свое проживание в ЦРМ на странице броней, эта бронь пометиться красным кругом. Вам
                нужно нажать завершение брони, чтобы эта бронь удалилась из общего списка броней и автоматически
                перенеслась в раздел Настройки =&gt; Завершеные брони. Так же при завершении брони гость получает письмо
                с
                благодарностью и просьбой оставить отзыв на яндекс картах.
            </p>
            <p>
                Также завершение брони необходимо делать для того чтобы в последствии выводилась финансовая часть в
                разделе &quot;Финансы&quot;
            </p>

            <h2>Удаление брони:</h2>
            <p>
                Если гость по какой-то причине не приехал или бронь сорвалась и вы не получили денег, то просто удалите
                бронь, а если получили деньги, то лучше завершить бронирование ,чтобы финансы записались. Вам
                нужно нажать удаление брони, чтобы эта бронь удалилась из общего списка броней и автоматически
                перенеслась в раздел Настройки =&gt; Удаленные брони. Гость не получит ни какого письма, а вам придет
                письмо на почту что бронь была удалена
            </p>

            <h2>Отмена брони:</h2>
            <p>
                Если у вас что-то пошло не так с гостем и по какой либо причине вам нужно отменить бронь, нажимаете
                отменить бронь, после в пявившейся форме пишите причину/извинения или то что нужно и бронь автоматически
                отменяется, удаляется из общего списка и переноситься в раздел Настройки =&gt; Отмененные брони. А гость
                получает письмо об отмене бронирования с вашим текстом.
            </p>
        </div>
    );
};

export default CurrentBookingContent;