import {
    validateContacts,
    validateFile,
    validateNumber,
    validateText,
    validateYaLink
} from "../../../../utils/validate/admin/validators";

export const fieldsHotelData = [
    {
        label: 'Название:',
        typeField: 'div',
        name: 'name',
        value: '',
        canChange: false,
        isEdit: false,
        errorText: '',
        helpText: 'Это поле не  изменяется, сделано для отображения названия.'
    },
    {
        label: 'Мин. кол. дней:',
        typeField: 'input',
        type: 'number',
        name: 'min_reservation_day',
        value: '',
        canChange: false,
        placeholder: 'Мин. кол. дней',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: 'Это поле можно изменять, чтобы поменять минимальное кол. дней бронирования. Указывать нужно только целые числа. '
    },
    {
        label: 'Описание отеля:',
        typeField: 'textarea',
        name: 'description',
        value: '',
        canChange: false,
        placeholder: 'Описание отеля',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: 'Описание отеля нужно указывать одним единым текстом (один абзац). Без технологии MARKDOWN.'
    },
    {
        label: 'Описание территории:',
        typeField: 'textarea',
        name: 'territory',
        value: '',
        canChange: false,
        placeholder: 'Описание территории',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Тут используется технология MARKDOWN перейдите в документацию, чтобы в шаблонизаторе написать текст в 
        нужном формате, а после просто скопировать и вставить в это поле. Нужно учитывать в какое поле будет вставлен этот текст,
        чтобы вы не писали текста больше, чем нужно и не нарушить дизайн этого элемента.`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'

    },
    {
        label: 'Адрес:',
        typeField: 'input',
        type: 'text',
        name: 'address',
        value: '',
        canChange: false,
        placeholder: 'Введите адрес, как на картах',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Адресс отеля, можно писать не полностью, а как вам хочется. Он служит для текстового отображения, 
        когда кликают по нему, люди переходят на ссылку из поля Ссылка на яндекс. Главный критерий этого поля, писать так, 
        чтобы понял посетитель.`
    },
    {
        label: 'Адрес сайта:',
        typeField: 'div',
        name: 'website',
        value: '',
        canChange: false,
        isEdit: false,
        validation: '',
        errorText: '',
        helpText: 'Просто отображает текущую ссылку на ваш отель.'
    },
    {
        label: 'Ссылка на яндекс:',
        typeField: 'input',
        type: 'text',
        name: 'link_to_ya_map',
        value: '',
        canChange: false,
        placeholder: 'Скопируйте в яндексе ссылку на ваш отель',
        isEdit: false,
        validation: (value) => validateYaLink(value, 'maps'),
        errorText: '',
        helpText: `Данное поле меняет ссылку для перехода, когда посетители кликают на адрес вашего отеля. В документации
         представлен простой пример, какую ссылку нужно копировать.`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    },
    {
        label: 'Конструктор ссылка:',
        typeField: 'input',
        type: 'text',
        name: 'code_iframe_map',
        value: '',
        canChange: false,
        placeholder: 'Ссылка на яндекс конструктор карт',
        isEdit: false,
        validation: (value) => validateYaLink(value, 'constructor'),
        errorText: '',
        helpText: 'Это поле меняет карту на главной странице и страницы контактов. В документации указана пошаговая инструкция, как получить код карты.',
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    },
    {
        label: 'Заключение:',
        typeField: 'textarea',
        name: 'text_conclusion',
        value: '',
        canChange: false,
        placeholder: 'Заключение',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: 'Заключительный текс нужно указывать одним единым текстом (один абзац). Без технологии MARKDOWN.'
    },
    {
        label: 'Широта:',
        typeField: 'input',
        type: 'text',
        name: 'latitude',
        value: '',
        canChange: false,
        placeholder: 'Широта',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: `Широта была взята с гугл карт. При изменении этого поля желательно указывать верные данные, так как 
        они испоьзуются для поисковых систем. Пример вы можете увидеть в документации.`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    },
    {
        label: 'Долгота:',
        typeField: 'input',
        type: 'text',
        name: 'longitude',
        value: '',
        canChange: false,
        placeholder: 'Долгота',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: `Долгота была взята с гугл карт. При изменении этого поля желательно указывать верные данные, так как 
        они испоьзуются для поисковых систем. Пример вы можете увидеть в документации.`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    },
];

export const fieldsContactsData = [
    {
        label: 'Телефон с WhatsApp:',
        typeField: 'input',
        type: 'tel',
        name: 'phone',
        value: '',
        canChange: true,
        placeholder: 'Введите телефон для звонка и вотсапа',
        isEdit: false,
        validation: (value) => validateContacts(value, 'phone'),
        errorText: '',
        helpText: 'Номер телефонна для выбранного отеля. Должен быть в формате 11 цифр (7*********) без символов и других значений.'
    },
    {
        label: 'Телеграм:',
        typeField: 'input',
        type: 'text',
        name: 'phone_tg',
        value: '',
        canChange: true,
        placeholder: 'Введите ник телеграма',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: 'ТГ который будет указываться на сайте данного отеля. Нужно написать ник из тг, без символа @.'
    },
    {
        label: 'Почту:',
        typeField: 'input',
        type: 'email',
        name: 'email',
        value: '',
        canChange: true,
        placeholder: 'Введите почту',
        isEdit: false,
        validation: (value) => validateContacts(value, 'email'),
        errorText: '',
        helpText: 'Почта которая будет указываться на сайте данного отеля.'
    },
];

export const fieldsFAQData = [
    {
        label: 'Вопрос:',
        typeField: 'textarea',
        name: 'question',
        value: '',
        placeholder: 'Введите вопрос',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Поле вопроса заполняется без использования markdown. Форма написания должна быть единым текстом (один абзац)
        и желательно не сильно длинным, для более корректного отображения.`
    },
    {
        label: 'Ответ:',
        typeField: 'textarea',
        name: 'answer',
        value: '',
        placeholder: 'Введите ответ',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Поле ответа заполняется без использования markdown. Можно писать любую длину так как этот текст не мешает дизайну.`
    },
    {
        label: 'Приоритет:',
        typeField: 'input',
        type: 'number',
        name: 'priority',
        value: '',
        placeholder: 'Приоритет показа',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: `Приоритет используется для отображения на сайте. Чем ниже значение, тем выше приоритет, начинается с 1 до ... `
    }
];

export const fieldsApartmentData = [
    {
        label: 'Название:',
        typeField: 'input',
        type: 'text',
        name: 'apartment_name',
        value: '',
        canChange: true,
        placeholder: 'Введите название номера',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Вы можетеменять название номера, но главное не называйте номера одинакого, иначе вам и гостям будет тяжело 
        отлечить номер и будет легко ошибиться при бронировании или редактировании номера.`
    },
    {
        label: 'Кол. этажей в доме:',
        typeField: 'input',
        type: 'number',
        name: 'amount_floor_in_house',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: 'Это поле должно быть целым числом и больше 0.'
    },
    {
        label: 'Этаж расположения:',
        typeField: 'input',
        type: 'number',
        name: 'apartment_floor',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: 'Это поле должно быть целым числом и больше 0.'
    },
    {
        label: 'Аренда целиком:',
        typeField: 'div',
        name: 'rent_all_house',
        value: '',
        canChange: false,
        isEdit: false,
        errorText: '',
        helpText: `Показывает есть ли возможность забронировать целый дом. (Т.е. есть ли другие номера связанные с этим номером).`
    },
    {
        label: 'Мак. кол. чел.:',
        typeField: 'input',
        type: 'number',
        name: 'person_max',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: 'Это поле должно быть целым числом и больше 0.'
    },
    {
        label: 'Кол. комнат:',
        typeField: 'input',
        type: 'number',
        name: 'amount_rooms',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: 'Это поле должно быть целым числом и больше 0.'
    },
    {
        label: 'Описание дома:',
        typeField: 'textarea',
        name: 'housing_description',
        value: '',
        canChange: true,
        placeholder: 'Описание дома',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Тут вы можете описать сам дом и прилегающую к нему территорию. Используется markdown, так что вы можете 
        заполнить в несколько обзацв или один, на ваше усмотрение. Ссылка на шаблонизатор где вы можете все прописать, а 
        после там скопировать и вставить сюда.`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'

    },
    {
        label: 'Описание номера:',
        typeField: 'textarea',
        name: 'apartment_description',
        value: '',
        canChange: true,
        placeholder: 'Описание номера',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Тут вы можете описать номер в виде красивого текста. Используется markdown, так что вы можете 
        заполнить в несколько обзацв или один, на ваше усмотрение. Ссылка на шаблонизатор где вы можете все прописать, а 
        после там скопировать и вставить сюда.`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'


    },
    {
        label: 'Описание удобств:',
        typeField: 'textarea',
        name: 'apartment_comfort',
        value: '',
        canChange: false,
        placeholder: 'Описание удобств',
        isEdit: false,
        validation: (value) => validateText(value),
        errorText: '',
        helpText: `Тут отдельно выводятся удобства номера. Для вашего удобства я заполнил начальный шаблон в документации,
        чтобы вы могли просто дополнить его или изменить, но основная структура уже присудствует. Заполнять, только через MARKDOWN`,
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    },
    {
        label: 'Обложка номера:',
        typeField: 'input',
        type: 'file',
        name: 'imagePreview',
        value: '',
        file: null,
        isEdit: false,
        validation: (file) => validateFile(file),
        errorText: '',
        helpText: `Это изображение которое будет отображаться в миниатюре (карточке номера) и первое изображение при входе в конкретный номер`,
    },
];

export const fieldsApartmentPrice = [
    {
        label: 'Период 01.05-12.05:',
        typeField: 'input',
        type: 'number',
        name: 'price_1',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
    },
    {
        label: 'Период 13.05-15.06:',
        typeField: 'input',
        type: 'number',
        name: 'price_2',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
    },
    {
        label: 'Период 16.06-15.09:',
        typeField: 'input',
        type: 'number',
        name: 'price_3',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
    },
    {
        label: 'Период 16.09-15.10:',
        typeField: 'input',
        type: 'number',
        name: 'price_4',
        value: '',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
    },
];

export const fieldsApartmentImages = [
    {
        label: 'Фотография:',
        typeField: 'input',
        type: 'file',
        name: 'image',
        value: '',
        file: null,
        isEdit: false,
        validation: (file) => validateFile(file),
        errorText: '',
        helpText: 'Загрузите изображение номера. Разрешено только загрузка .webp формата. Так же не забудте ужать изображение, чтобы оно не грузилось по минуте.',
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    },
    {
        label: 'Приоритет:',
        typeField: 'input',
        type: 'number',
        name: 'image_priority',
        value: '',
        placeholder: 'Приоритет показа',
        isEdit: false,
        validation: (value) => validateNumber(value),
        errorText: '',
        helpText: 'Отображает в каком именно порядке будут показаны фотографии. От 1 до ...'
    }
]