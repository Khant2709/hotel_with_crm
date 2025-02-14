/**
 * Функция для рендера дней календаря.
 * @param {Date} selectedDate - Выбранная дата.
 * @returns {Array} - Массив объектов с днями.
 */
export const renderDays = (selectedDate) => {
    const days = []; // Создаем массив для хранения компонентов с днями месяца
    const monthStart = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
    ); // Получаем начальную дату текущего месяца
    const monthEnd = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
    ); // Получаем конечную дату текущего месяца
    const startDayOfWeek = monthStart.getDay(); // Получаем день недели, с которого начинается месяц (0 - воскресенье, 1 - понедельник, и т.д.)
    const startDate = new Date(monthStart);
    // Устанавливаем начальную дату, соответствующую понедельнику, вычитая из начальной даты день недели и добавляя 1 день, если начало месяца не попадает на понедельник
    startDate.setDate(
        startDate.getDate() - startDayOfWeek + (startDayOfWeek === 0 ? -6 : 1)
    );
    const endDate = new Date(monthEnd); // Получаем объект даты для последнего дня текущего месяца
    let currentDate = new Date(startDate); // Устанавливаем текущую дату в начало месяца

    // Пока текущая дата не превышает последний день месяца
    while (currentDate <= endDate) {
        // Создаем массив с днем месяца
        days.push({day: currentDate.toISOString()});
        currentDate.setDate(currentDate.getDate() + 1); // Увеличиваем текущую дату на 1 день
    }

    // Если последний день месяца - воскресенье, добавляем числа следующего месяца до субботы
    if (endDate.getDay() !== 0) {
        let nextMonthDate = new Date(endDate);
        nextMonthDate.setDate(nextMonthDate.getDate() + 1); // Первое число следующего месяца

        while (nextMonthDate.getDay() !== 1) {
            days.push({day: nextMonthDate.toISOString()});
            nextMonthDate.setDate(nextMonthDate.getDate() + 1); // Переходим к следующему дню
        }
    }
    return days; // Возвращаем массив с компонентами дней месяца
};