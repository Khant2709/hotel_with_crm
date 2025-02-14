/** Функция для правильного окончания слова
 * @return {string} - от кол. возращает правильное окончание */
const getWordEnding = (type, count) => {
    if (count === 1) return type === "guest" ? "гость" : "комната";
    if (count > 4) return type === "guest" ? "гостей" : "комнат";
    return type === "guest" ? "гостя" : "комнаты";
};

/** Функция генерации нужного списка
 * @param {object} currentApartment - данные конкретного номера
 * @param {string} typeDescription - тип описания
 * @return {array} - массив нужных полей */
export const generateApartmentDescription = (currentApartment, typeDescription) => {
    const {person_max, amount_rooms, housing_description, apartment_description, apartment_comfort} = currentApartment;

    if (typeDescription === 'short') {
        return [
            {
                id: 1,
                count: person_max,
                text: getWordEnding("guest", person_max),
            },
            {
                id: 2,
                count: amount_rooms,
                text: getWordEnding("rooms", amount_rooms),
            }
        ];
    }

    if (typeDescription === 'full') {
        return [
            {
                id: 1,
                typeDescription: "text",
                titleDescription: "Описание:",
                textDescription: housing_description,
            },
            {
                id: 2,
                typeDescription: "markDown",
                titleDescription: "Описание Номера:",
                textDescription: apartment_description,
            },
            {
                id: 3,
                typeDescription: "markDown",
                titleDescription: "Удобства:",
                textDescription: apartment_comfort,
            },
        ];
    }

};

