import {z} from 'zod';

export const numberSchema = z
    .number({
        required_error: 'Значение обязательно',
        invalid_type_error: 'Должно быть числом',
    })
    .min(1, 'Число должно быть не меньше 1')
    .positive('Число должно быть положительным')


// Регулярное выражение для проверки имени файла
const fileNameRegex = /^[a-zA-Z0-9_.]+$/;

// Допустимые MIME-типы
const allowedTypes = ['image/webp'];

export const fileSchema = z.object({
    name: z
        .string()
        .regex(fileNameRegex, 'Название файла должно содержать только английские буквы, цифры и "_"')
        .regex(/\.\w+$/, 'Файл должен иметь расширение')
        .max(50, 'Название файла не должно превышать 50 символов')
        .refine(
            (name) => !name.includes('..') && !name.includes('�'),
            'Название файла содержит недопустимые символы ("..", "�")',
        ),
    type: z
        .string()
        .refine((type) => allowedTypes.includes(type), `Файл должен быть формата ${allowedTypes.join(', ')}`),
    size: z
        .number()
        .min(1024, 'Файл слишком маленький (менее 1 КБ)')
        .max(5 * 1024 * 1024, 'Размер файла не должен превышать 5 МБ'),
});

export const textSchema = z.string()
    .nonempty({message: 'Поле не должно быть пустым'})
    .min(4, 'Поле не может быть пустым, мин. длина 4 символов')
    .max(5000, 'Текст слишком длинный, максимум 5000 символов')
    .refine((text) => !/[<>]/.test(text), 'Текст содержит запрещенные символы "<" или ">"');

// Валидатор для ссылки на Яндекс Карты
export const yandexMapsLinkSchema = z.string()
    .nonempty({message: 'Поле не должно быть пустым'})
    .url().refine((value) => {
            return value.startsWith('https://yandex.ru/maps/');
        }, 'Ссылка должна быть на Яндекс Карты',
    );

// Валидатор для ссылки на конструктор Яндекс Карт
export const yandexMapsConstructorLinkSchema = z.string()
    .nonempty({message: 'Поле не должно быть пустым'})
    .url()
    .refine((value) => {
        return value.startsWith('https://yandex.ru/map-widget/v1/') && value.includes('um=constructor');
    }, 'Ссылка должна быть на конструктор Яндекс Карт');

// Валидатор для телефона
export const phoneSchema = z.string()
    .nonempty({message: 'Поле не должно быть пустым'}) // Проверка на пустоту
    .regex(/^7\d{10}$/, 'Телефон должен начинаться с 7 и содержать 11 цифр'); // Проверка формата

// Валидатор для email
export const emailSchema = z.string()
    .nonempty('Поле не должно быть пустым') // Проверка на пустоту
    .email('Некорректный email'); // Проверка формата email
