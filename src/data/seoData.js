import {DEFAULT_CONTACTS, HOTEL_LINK, HOTELS_NAME_AND_LINK} from "../config/envData";
import {getFullPathImage} from "../utils/getFullPathImage";

const createBreadcrumb = (position, name, item) => {
    return {
        "@type": "ListItem",
        "position": position,
        "name": name,
        "item": item
    }
};

const createBlogPost = (title, description, url) => {
    return {
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "url": url,
    }
}

const createJsonLD = ({type, name, description, url, itemListElement, otherData = {}}) => {
    return {
        "@context": "https://schema.org",
        "@type": type,
        "name": name,
        "description": description,
        "url": url,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        },
        ...otherData
    }
};

// главная страница
export const jsonLDMainPage = createJsonLD({
    type: "Organization",
    name: "Край моря",
    description: "Край моря — сеть отелей и баз отдыха на Черном море. Откройте для себя Сан Марина Сочи, Вижу море, Бор О Дача и Шикарный вид для идеального отдыха.",
    url: `${HOTEL_LINK}/`,
    itemListElement: [
        createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
    ],
    otherData: {
        "logo": {
            "@type": "ImageObject",
            "url": `${HOTEL_LINK}/hotel3.png`, // Укажите путь к логотипу
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": DEFAULT_CONTACTS.phoneRU,
            "contactType": "бронирование и поддержка",
            "email": "resortegorova@gmail.com",
        },
        "subOrganization": [
            {
                "@type": "Hotel",
                "name": "Сан Марина Сочи",
                "url": "https://sanmarinosochi.ru",
            },
            {
                "@type": "Hotel",
                "name": "Вижу море",
                "url": "https://vizhumore.ru",
            },
            {
                "@type": "Hotel",
                "name": "Бор О Дача",
                "url": "https://borodacha.ru",
            },
            {
                "@type": "Hotel",
                "name": "Шикарный вид",
                "url": "https://shikarnyivid.ru",
            },
        ],
    },
})

/** Страница отелей */
export const jsonLDHotelsPage = createJsonLD({
    type: "CollectionPage",
    name: "Все наши отели с кратким описанием",
    description: `Ознакомьтесь с нашими отелями на Черном море: Сан Марина Сочи, Вижу море, Бор О Дача и Шикарный вид. Выберите идеальный отдых!`,
    url: `${HOTEL_LINK}/hotels`,
    itemListElement: [
        createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
        createBreadcrumb(2, "Отели", `${HOTEL_LINK}/hotels`),
    ],
    otherData: {
        "mainEntity": [
            {
                "@type": "Hotel",
                "name": "Сан Марина Сочи",
                "description": "Апартаменты в Лазаревском с выходом на пляж.",
                "url": "https://sanmarinosochi.ru",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Лазаревское, Сочи",
                    "addressRegion": "Краснодарский край",
                    "streetAddress": "ул. Одоевского, 87",
                    "addressCountry": "RU",
                },
                "telephone": `${DEFAULT_CONTACTS.phoneRU}`,
                "image": {
                    "@type": "ImageObject",
                    "url": "https://sanmarinosochi.ru/previe/previe_Hotel_4.webp",
                },
                "priceRange": "6000-10000 RUB",
            },
            {
                "@type": "Hotel",
                "name": "Вижу море",
                "description": "База отдыха с видом на море.",
                "url": "https://vizhumore.ru",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "хутор Бетта",
                    "addressRegion": "Краснодарский край",
                    "addressCountry": "RU",
                },
                "telephone": `${DEFAULT_CONTACTS.phoneRU}`,
                "image": {
                    "@type": "ImageObject",
                    "url": "https://vizhumore.ru/previe/previe_Hotel_3.webp",
                },
                "priceRange": "8000-18000 RUB",
            },
            {
                "@type": "Hotel",
                "name": "Бор О Дача",
                "description": "База отдыха в лесу недалеко от моря.",
                "url": "https://borodacha.ru",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "хутор Бетта",
                    "addressRegion": "Краснодарский край",
                    "addressCountry": "RU",
                },
                "telephone": `${DEFAULT_CONTACTS.phoneRU}`,
                "image": {
                    "@type": "ImageObject",
                    "url": "https://borodacha.ru/previe/previe_Hotel_2.webp",
                },
                "priceRange": "2500-18000 RUB",
            },
            {
                "@type": "Hotel",
                "name": "Шикарный вид",
                "description": "База отдыха с шикарным видом.",
                "url": "https://shikarnyivid.ru",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "п. Кабардинка",
                    "addressRegion": "Краснодарский край",
                    "streetAddress": "ул. Сухумское Шоссе 1а",
                    "addressCountry": "RU",
                },
                "telephone": `${DEFAULT_CONTACTS.phoneRU}`,
                "image": {
                    "@type": "ImageObject",
                    "url": "https://shikarnyivid.ru/previe/previe_Hotel_1.webp",
                },
                "priceRange": "8000-19000 RUB",
            },
        ],
    }
});

/** Страница всех номеров */
export const jsonLDReservationAllPage = (apartments) => {
    return createJsonLD({
        type: "CollectionPage",
        name: "Все номера наших отелей",
        description: "Ознакомьтесь с номерами наших отелей на Черном море: Сан Марина Сочи, Вижу море, Бор О Дача и Шикарный вид. 30 вариантов для вашего отдыха!",
        url: `${HOTEL_LINK}/reservationall`,
        itemListElement: [
            createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
            createBreadcrumb(2, "Номера", `${HOTEL_LINK}/reservationall`),
        ],
        otherData: {
            "mainEntity": apartments.slice(0, 10).map(room => {
                const hotel = HOTELS_NAME_AND_LINK.find(hotel => hotel.id === room.hotel_id)
                return {
                    "@type": "Room",
                    "name": room?.apartment_name || 'Апартаменты',
                    "description": room?.apartment_description || 'Прекрасное метсо для вашего отдыха на черноморском побережье',
                    "url": room.url || `${HOTEL_LINK}/reservation/${room.id}`, // Ссылка на страницу номера, если есть
                    "image": {
                        "@type": "ImageObject",
                        "url": getFullPathImage(room.apartment_preview_img_name, room.apartment_preview_img_name),
                    },
                    "numberOfRooms": 1,
                    "offers": {
                        "@type": "Offer",
                        "price": room?.prices ? Math.min(...Object.values(room.prices)) : '$$',
                        "priceCurrency": "RUB",
                        "availability": "http://schema.org/InStock",
                    },
                    "containedInPlace": {
                        "@type": "Hotel",
                        "name": hotel.name,
                        "url": hotel.link,
                    },
                }
            }),
        },
    });
}

/** Страница конкретного номера */
export const jsonLDCurrentRoom = ({room, hotelData}) => {
    const pathToImage = getFullPathImage(room.apartment_folder_img, room.apartment_preview_img_name);
    const minPrice =
        room.prices && Object.values(room.prices).length
            ? `от ${Math.min(...Object.values(room.prices))} RUB`
            : "По запросу";

    return createJsonLD({
        type: "Room",
        name: room.apartment_name,
        description:  room.apartment_description,
        url: `${HOTEL_LINK}/reservation/${room.id}`,
        itemListElement: [
            createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
            createBreadcrumb(2, "Номера", `${HOTEL_LINK}/reservationall`),
            createBreadcrumb(3, room.apartment_name, `${HOTEL_LINK}/reservation/${room.id}`),
        ],
        otherData: {
            "image": {
                "@type": "ImageObject",
                "url": pathToImage,
            },
            "numberOfRooms": room.amount_rooms,
            "occupancy": {
                "@type": "QuantitativeValue",
                "maxValue": room.person_max, // Максимальное количество гостей
            },
            "offers": minPrice
                ? {
                    "@type": "Offer",
                    "price": minPrice,
                    "priceCurrency": "RUB",
                    "availability": "http://schema.org/InStock", // Можно сделать динамичным
                }
                : undefined,
            "containedInPlace": {
                "@type": "Hotel",
                "name": hotelData.name,
                "url": hotelData.url,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": hotelData.address || "Не указано",
                    "addressRegion": "Краснодарский край",
                    "addressCountry": "RU",
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": hotelData.latitude,
                    "longitude": hotelData.longitude,
                },
                "telephone": DEFAULT_CONTACTS.phoneRU,
            },
        }
    });
};

/** Страница блога */
export const jsonLDBlogPage = (articles) => {
    return createJsonLD({
        type: "Blog",
        name: "Край моря - блог про интересные места и достопримечательности на Черном море",
        description: `Ознакомьтесь с нашим блогом: лучшие маршруты, достопримечательности, пляжи, заведения и природные заповедники Черного моря.`,
        url: `${HOTEL_LINK}/blog`,
        itemListElement: [
            createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
            createBreadcrumb(2, "Блог", `${HOTEL_LINK}/blog`),
        ],
        otherData: articles.length > 0
            ? {
                "blogPost": articles.map(article =>
                    createBlogPost(article.title, article.short_text, `${HOTEL_LINK}/blog/${article.id}`)
                ),
            }
            : {},
    });
}

/** Страница конкретной статьи */
export const jsonLDCurrentArticlePage = (article) => {
    const {id, title, short_text, date, folder_img, preview_img_name} = article;

    return createJsonLD({
        type: "BlogPosting",
        name: title,
        description: short_text,
        url: `${HOTEL_LINK}/blog/${id}`,
        itemListElement: [
            createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
            createBreadcrumb(2, "Блог", `${HOTEL_LINK}/blog`),
            createBreadcrumb(3, title, `${HOTEL_LINK}/blog/${id}`),
        ],
        otherData: {
            "headline": title,
            "author": {
                "@type": "Person",
                "name": "Егоров Егор Викторович"
            },
            "publisher": {
                "@type": "Organization",
                "name": "ИП Егоров Егор Викторович",
                "url": HOTEL_LINK,
            },
            "datePublished": date,
            "dateModified": date,
            "image": {
                "@type": "ImageObject",
                "url": getFullPathImage(folder_img, preview_img_name),
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${HOTEL_LINK}/blog/${id}`,
            },
        }
    })
};

/** Страница контактов */
export const jsonLDContactsPage = createJsonLD({
    type: "ContactPage",
    name: "Край Моря - Контактная информация обо всех отелях",
    description: `Контактная информация отелей сети Край моря на Черном море. Обратная связь и бронирование через форму или сайты отелей.`,
    url: `${HOTEL_LINK}/contacts`,
    itemListElement: [
        createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
        createBreadcrumb(2, "Контакты", `${HOTEL_LINK}/contacts`),
    ]
});

/** Страница FAQ */
export const jsonLDQuestionPage = (faq = []) => {
    return createJsonLD({
        type: "FAQPage",
        name: "Край моря - Часто задаваемые вопросы",
        description: "Ответы на популярные вопросы об отдыхе в отелях Черного моря: бронирование, услуги, расположение и многое другое.",
        url: `${HOTEL_LINK}/questionlist`,
        itemListElement: [
            createBreadcrumb(1, "Главная", `${HOTEL_LINK}/`),
            createBreadcrumb(2, "FAQ", `${HOTEL_LINK}/questionlist`),
        ],
        otherData: {
            "mainEntity": faq.slice(0, 5).map(el => ({
                "@type": "Question",
                "name": el?.question || '',
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": el?.answer || ''
                }
            })),
            "publisher": {
                "@type": "Organization",
                "name": "ИП Егоров Егор Викторович",
                "url": HOTEL_LINK,
            },
        }
    })
};