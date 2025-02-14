import {DEFAULT_CONTACTS, HOTEL_LINK} from "../config/envData";
import {getFullPathImage} from "../utils/getFullPathImage";

const SEO_GENERAL_DATA = {
    address: {
        "@type": "PostalAddress",
        "streetAddress": "ул. Одоевского, 87",
        "addressLocality": "Лазаревское",
        "addressRegion": "Краснодарский край",
        "postalCode": "354200",
        "addressCountry": "RU"
    },
    geo: {
        "@type": "GeoCoordinates",
        "latitude": "43.913480",
        "longitude": "39.321003"
    },
    telephone: `+${DEFAULT_CONTACTS.phone}`,
    priceRange: "6000-10000 RUB",
    starRating: {
        "@type": "AggregateRating", // рейтинг из агрегаторов
        "ratingValue": "4.9", // Средняя оценка из отзывов
        "reviewCount": "787" // Общее количество отзывов
    },
    amenityFeature: [
        "Бесплатный Wi-Fi",
        "Кухня",
        "Кондиционер",
        "Стиральная машина",
        "Вид на море",
        "Шаговая доступность до пляжа",
    ]
};

// главная страница
export const jsonLDMainPage = [
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Сан Марина",
        "description": `Апартаменты Сан Марина в Сочи, предназначены для шикарного отдыха и приятных воспоминаний. ${DEFAULT_CONTACTS.address}, ${DEFAULT_CONTACTS.phoneRU} для бронирования и обслуживания гостей.`,
        "url": HOTEL_LINK,
        "address": SEO_GENERAL_DATA.address,
        "geo": SEO_GENERAL_DATA.geo,
        "telephone": SEO_GENERAL_DATA.telephone,
        "image": `${HOTEL_LINK}/previeImg.jpg`,
        "priceRange": SEO_GENERAL_DATA.priceRange,
        "starRating": SEO_GENERAL_DATA.starRating,
        "publisher": {
            "@type": "Organization",
            "name": "ИП Егоров Егор Викторович"
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Апартаменты на берегу моря - Сан Марина",
        "url": HOTEL_LINK,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": HOTEL_LINK
                }
            ]
        }
    }
];

// страница отелей
export const jsonLDHotelsPage = [
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "ЖК Сан Марина и другие наши базы отдыха",
        "description": `Выбирайте любой наш отель на Черном море в Кабардинке, Геленджике, Сочи. Забронируйте прямо сейчас! Телефон: ${DEFAULT_CONTACTS.phoneRU}.`,
        "url": `${HOTEL_LINK}/hotels`,
        "address": SEO_GENERAL_DATA.address,
        "geo": SEO_GENERAL_DATA.geo,
        "telephone": SEO_GENERAL_DATA.telephone,
        "image": `${HOTEL_LINK}/previeImg.jpg`,
        "priceRange": SEO_GENERAL_DATA.priceRange,
        "starRating": SEO_GENERAL_DATA.starRating,
        "includedInDataCatalog": {
            "@type": "DataCatalog",
            "name": "Наши отели и базы отдыха",
            "url": `${HOTEL_LINK}/hotels`,
            "dataset": [
                {
                    "@type": "Hotel",
                    "name": "Сан Марина Сочи",
                    "description": "Апартаменты в Лазаревском с выходом на пляж.",
                    "url": `https://sanmarinosochi.ru`,
                    "address": "Краснодарский край, Сочи, Лазаревское, ул. Одоевского, 87",
                    "telephone": SEO_GENERAL_DATA.telephone,
                    "image": `https://sanmarinosochi.ru/previe/previe_Hotel_4.webp`,
                    "priceRange": "6000-10000 RUB",
                },
                {
                    "@type": "Hotel",
                    "name": "Вижу море",
                    "description": "База отдыха с видом на море",
                    "url": `https://vizhumore.ru`,
                    "address": "Краснодарский край, хутор Бетта",
                    "telephone": SEO_GENERAL_DATA.telephone,
                    "image": `https://vizhumore.ru/previe/previe_Hotel_3.webp`,
                    "priceRange": "8000-18000 RUB",
                },
                {
                    "@type": "Hotel",
                    "name": "Бор О Дача",
                    "description": "База отдыха в лесу не подалеку от моря",
                    "url": `https://borodacha.ru`,
                    "address": "Краснодарский край, хутор Бетта",
                    "telephone": SEO_GENERAL_DATA.telephone,
                    "image": `https://borodacha.ru/previe/previe_Hotel_2.webp`,
                    "priceRange": "2500-18000 RUB",
                },
                {
                    "@type": "Hotel",
                    "name": "Шикарный вид",
                    "description": "База отдыха с шикарным видом",
                    "url": `https://shikarnyivid.ru`,
                    "address": "Краснодарский край, п.Кабардинка, ул. Сухумское Шоссе 1а",
                    "telephone": SEO_GENERAL_DATA.telephone,
                    "image": `https://shikarnyivid.ru/previe/previe_Hotel_1.webp`,
                    "priceRange": "8000-19000 RUB",
                },
            ]
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "ЖК Сан Марина и другие наши базы отдыха",
        "url": `${HOTEL_LINK}/hotels`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": HOTEL_LINK
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Отели",
                    "item": `${HOTEL_LINK}/hotels`,
                },
            ]
        }
    }
];

// страница номеров текущего отеля
export const jsonLDReservationPage = (rooms) => {
    return [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Список апартаментов в Сан Марина",
            "description": "Выбирайте и бронируйте апартаменты в Сочи, Лазаревское. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.",
            "url": `${HOTEL_LINK}/reservation`,
            "address": SEO_GENERAL_DATA.address,
            "geo": SEO_GENERAL_DATA.geo,
            "telephone": SEO_GENERAL_DATA.telephone,
            "image": `${HOTEL_LINK}/previeImg.jpg`,
            "starRating": SEO_GENERAL_DATA.starRating,
        },
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Список апартаментов",
            "itemListElement": rooms.map((room, index) => {
                const pathToImage = getFullPathImage(
                    room.apartment_folder_img,
                    room.apartment_preview_img_name
                );
                const minPrice =
                    room.prices && Object.values(room.prices).length
                        ? `от ${Math.min(...Object.values(room.prices))}`
                        : "По запросу";

                return {
                    "@type": "Accommodation",
                    "name": room.apartment_name,
                    "description": room.apartment_description,
                    "image": pathToImage,
                    "numberOfRooms": room.amount_rooms,
                    "occupancy": {
                        "@type": "QuantitativeValue",
                        "value": room.person_max,
                        "unitCode": "C62", // Единица измерения для количества людей
                    },
                    "priceRange": `${minPrice} RUB`,
                    "position": index + 1,
                    "url": `${HOTEL_LINK}/reservation/${room.id}`,
                };
            }),
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Выбор апартаментов в Сан Марина",
            "url": `${HOTEL_LINK}/reservation`,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Главная",
                        "item": HOTEL_LINK,
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Список апартаментов в Сан Марина",
                        "item": `${HOTEL_LINK}/reservation`,
                    },
                ],
            },
        },
    ];
};

// страница номеров со всех наших отелей
export const jsonLDReservationAllPage = [
    {
        "@context": "https://schema.org",
        "@type": "Apartment",
        "name": "Свободные апартаменты",
        "description": "Выбирайте и бронируйте апартаменты, номера, котеджи на Черном море в Сочи, Лазаревском, Кабардинке, Бетте, Геленджике.",
        "url": `${HOTEL_LINK}/reservationall`,
        "address": SEO_GENERAL_DATA.address,
        "geo": SEO_GENERAL_DATA.geo,
        "telephone": SEO_GENERAL_DATA.telephone,
        "image": `${HOTEL_LINK}/previeImg.jpg`,
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Свободные апартаменты",
        "url": `${HOTEL_LINK}/reservationall`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": HOTEL_LINK
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Свободные апартаменты",
                    "item": `${HOTEL_LINK}/reservationall`,
                },
            ]
        }
    }
];

// Универсальная функция для генерации JSON-LD для страницы конкретного номера
export const jsonLDCurrentRoom = ({room, hotelData}) => {
    const pathToImage = getFullPathImage(room.apartment_folder_img, room.apartment_preview_img_name);
    const minPrice =
        room.prices && Object.values(room.prices).length
            ? `от ${Math.min(...Object.values(room.prices))} RUB`
            : "По запросу";

    return [
        {
            "@context": "https://schema.org",
            "@type": "Accommodation",
            "name": room.apartment_name,
            "description": room.apartment_description,
            "image": pathToImage,
            "numberOfRooms": room.amount_rooms,
            "occupancy": {
                "@type": "QuantitativeValue",
                "value": room.person_max,
                "unitCode": "C62" // Единица измерения для количества людей
            },
            "address": hotelData.address,
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": hotelData.latitude,
                "longitude": hotelData.longitude
            },
            "telephone": SEO_GENERAL_DATA.telephone,
            "priceRange": minPrice,
            "amenityFeature": SEO_GENERAL_DATA.amenityFeature.map((amenity) => ({
                "@type": "LocationFeatureSpecification",
                "name": amenity,
                "value": true
            })),
            "url": `${HOTEL_LINK}/reservation/${room.id}`
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": room.apartment_name,
            "description": room.apartment_description,
            "url": `${HOTEL_LINK}/reservation/${room.id}`,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Главная",
                        "item": HOTEL_LINK
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Список номеров",
                        "item": `${HOTEL_LINK}/reservation`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": room.apartment_name,
                        "item": `${HOTEL_LINK}/reservation/${room.id}`
                    }
                ]
            }
        }
    ];
};

// страница блога
export const jsonLDBlogPage = [
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Блог - интересные места и достопримечательности на Черном море",
        "description": `Ознакомьтесь с нашим блогом: лучшие маршруты, достопримечательности, пляжи, заведения и природные заповедники.`,
        "url": `${HOTEL_LINK}/blog`,
        "image": `${HOTEL_LINK}/previeImg.jpg`,
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Блог - интересные места и достопримечательности на Черном море",
        "url": `${HOTEL_LINK}/blog`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": HOTEL_LINK
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "блог",
                    "item": `${HOTEL_LINK}/blog`,
                },
            ]
        }
    }
];

// Страница конкретной статьи
export const jsonLDCurrentArticlePage = (article) => {
    const {id, title, description, date_published, date_modified, image_name} = article;
    return [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${HOTEL_LINK}/blog/${id}`
            },
            "headline": title,
            "description": description,
            "author": {
                "@type": "Person",
                "name": "Егоров Егор Викторович"
            },
            "publisher": {
                "@type": "Organization",
                "name": "ИП Егоров Егор Викторович",
                "url": "https://hotelsblacksea.ru",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://hotelsblacksea.ru/logo.png" // Здесь можно заменить на логотип вашего сайта
                }
            },
            "datePublished": date_published,
            "dateModified": date_modified,
            "image": `https://hotelsblacksea.ru/images/articles/${image_name || "default.jpg"}` // Если изображение статьи не передано, используется дефолтное изображение
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "url": `${HOTEL_LINK}/blog/${id}`,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Главная",
                        "item": HOTEL_LINK
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "блог",
                        "item": `${HOTEL_LINK}/blog`,
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": title,
                        "item": `${HOTEL_LINK}/blog/${id}`,
                    },
                ]
            }
        }
    ];
};

// страница контактов
export const jsonLDContactsPage = [
    {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Сан Марина  - Контактная информация",
        "description": `Контакты апартаментов Сан Марина в Лазаревское. ${DEFAULT_CONTACTS.address},  ${DEFAULT_CONTACTS.phoneRU} для бронирования и обслуживания гостей.`,
        "url": `${HOTEL_LINK}/contacts`,
        "address": SEO_GENERAL_DATA.address,
        "geo": SEO_GENERAL_DATA.geo,
        "telephone": SEO_GENERAL_DATA.telephone,
        "image": `${HOTEL_LINK}/previeImg.jpg`,
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Сан Марина - Контактная информация",
        "url": `${HOTEL_LINK}/contacts`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": HOTEL_LINK
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Контакты",
                    "item": `${HOTEL_LINK}/contacts`,
                },
            ]
        }
    }
];

// страница пути до жк Сан Марина (как добраться до отеля)
export const jsonLDTrackPage = [
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Путь до ЖК Сан Марина",
        "description": "Путь на общественном транспорте до ЖК Сан Марина.",
        "url": `${HOTEL_LINK}/contacts/track/bus`,
        "address": SEO_GENERAL_DATA.address,
        "geo": SEO_GENERAL_DATA.geo,
        "telephone": SEO_GENERAL_DATA.telephone,
        "image": `${HOTEL_LINK}/previeImg.jpg`,
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Путь до ЖК Сан Марина",
        "url": `${HOTEL_LINK}/contacts/track/bus`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": HOTEL_LINK
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Контакты",
                    "item": `${HOTEL_LINK}/contacts`,
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Путь до ЖК Сан Марина",
                    "item": `${HOTEL_LINK}/contacts/track/bus`,
                },
            ]
        }
    }
];

// страница FAQ
export const jsonLDQuestionPage = (faq) => {
    return [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Часто задаваемые вопросы об апартаментах Сан Марина",
            "description": "Часто задаваемые вопросы об апартаментах Сан Марина. Тут вы узнаете ответы на все часто заадаваемые вопросы.",
            "mainEntity": faq.map(el => ({
                "@type": "Question",
                "name": el?.question || '',
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": el?.answer || ''
                }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Часто задаваемые вопросы об апартаментах Сан Марина",
            "url": `${HOTEL_LINK}/questionlist`,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Главная",
                        "item": HOTEL_LINK
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Часто задаваемые вопросы",
                        "item": `${HOTEL_LINK}/questionlist`,
                    },
                ]
            }
        }
    ];
};

