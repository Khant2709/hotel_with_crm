import {validateFile, validateNumber, validateText} from "../../../utils/validate/admin/validators";
import {createField} from "../../../components/ui/fields/createField";

export const fieldsArticleData = [
    createField({
        label: 'Заголовок статьи:',
        typeField: 'input',
        type: 'text',
        name: 'title',
        placeholder: 'Введите заголовок',
        value: '',
        validation: (value) => validateText(value),
        helpText: `Название не долно быть слишком длинное и иметь спец символы`
    }),
    createField({
        label: 'Кратке описание:',
        typeField: 'textarea',
        name: 'short_text',
        placeholder: 'Краткое описание статьи',
        value: '',
        validation: (value) => validateText(value),
        helpText: `Текст должен состоять из одного абзаца. Тут не используется технология MARKDOWN.`,
    }),
    createField({
        label: 'Статья:',
        typeField: 'textarea',
        name: 'text',
        value: '',
        placeholder: 'Статья',
        validation: (value) => validateText(value),
        helpText: `Текст может состоять из множества абзацев, списков и т.д. Тут используется технология MARKDOWN.`,
    }),
    createField({
        label: 'Область:',
        typeField: 'select',
        name: 'area',
        value: '',
        options: [
            {
                value: '',
                view: 'выбрать'
            },
            {
                value: 'кабардинка',
                view: 'кабардинка'
            },
            {
                value: 'бетта',
                view: 'бетта'
            },
            {
                value: 'сочи',
                view: 'сочи'
            }
        ],
        validation: (value) => validateText(value),
        helpText: `Нужно выбрать область к которой статья будет находиться ближе для корректного отображения`,
    }),
    createField({
        label: 'Обложка номера:',
        typeField: 'input',
        type: 'file',
        name: 'imagePreview',
        value: '',
        file: null,
        validation: (file) => validateFile(file),
        helpText: `Это изображение которое будет отображаться в миниатюре и первое изображение при входе на статью.`,
    })
];

export const fieldsArticleImages = [
    createField({
        label: 'Фотография:',
        typeField: 'input',
        type: 'file',
        name: 'image',
        value: '',
        validation: (file) => validateFile(file),
        helpText: 'Загрузите изображение номера. Разрешено только загрузка .webp формата. Так же не забудте ужать изображение, чтобы оно не грузилось по минуте.',
        helpLink: 'https://hotelsblacksea.ru/admincrm/doc'
    }),
    createField({
        label: 'Приоритет:',
        typeField: 'input',
        type: 'number',
        name: 'image_priority',
        placeholder: 'Приоритет показа',
        value: '',
        validation: (value) => validateNumber(value),
        helpText: 'Отображает в каком именно порядке будут показаны фотографии. От 1 до ...'
    })
]