export const CATEGORY_GROUP = {
    MAIN: {
        name: 'MAIN',
        title: 'Основные',
    },
    BOOKING: {
        name: 'BOOKING',
        title: 'Брони',
    },
    HOTELS: {
        name: 'HOTELS',
        title: 'Отели',
    },
    BLOG: {
        name: 'BLOG',
        title: 'Блог',
    },
    FINANCE: {
        name: 'FINANCE',
        title: 'Финансы',
    },
    CLIENTS: {
        name: 'CLIENTS',
        title: 'Клиенты',
    },
    SETTING: {
        name: 'SETTING',
        title: 'Настройки',
    },
};

const createCategory = (group, title, link) => {
    return {
        group,
        title,
        link
    }
};

export const navbarDoc = [
    createCategory(CATEGORY_GROUP.MAIN.name, 'Шаблонизатор Markdown', '/markdown'),
    createCategory(CATEGORY_GROUP.MAIN.name, 'Работа с изображениями', '/image'),
    createCategory(CATEGORY_GROUP.MAIN.name, 'Конструктор карт', '/constructor'),
    // createCategory(CATEGORY_GROUP.MAIN.name, 'Ошибки', '/error'),

    createCategory(CATEGORY_GROUP.BOOKING.name, 'Страницы броней', '/booking'),
    createCategory(CATEGORY_GROUP.BOOKING.name, 'Конкретная бронь', '/currentbooking'),

    createCategory(CATEGORY_GROUP.HOTELS.name, 'Данные отеля и контакты', '/hoteldata'),
    createCategory(CATEGORY_GROUP.HOTELS.name, 'Изображения отеля', '/hotelimage'),
    createCategory(CATEGORY_GROUP.HOTELS.name, 'FAQ отеля', '/faq'),
    createCategory(CATEGORY_GROUP.HOTELS.name, 'Номера отеля', '/apartments'),

    createCategory(CATEGORY_GROUP.BLOG.name, 'Работа со статьями', '/article'),

    createCategory(CATEGORY_GROUP.FINANCE.name, 'Финансы', '/finance'),

    createCategory(CATEGORY_GROUP.CLIENTS.name, 'Работа с клиентами', '/clients'),

    createCategory(CATEGORY_GROUP.SETTING.name, 'Создание администратора', '/createadmin'),
    createCategory(CATEGORY_GROUP.SETTING.name, 'Таблицы ушедших броней', '/tablebooking'),
];