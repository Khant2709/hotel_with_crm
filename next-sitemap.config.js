module.exports = {
    siteUrl: 'https://hotelsblacksea.ru', // Замените на URL вашего сайта
    generateRobotsTxt: true, // Создавать robots.txt
    exclude: ['/admincrm/*', '/admincrmlogin/*'], // Исключите страницы или шаблоны
    changefreq: 'daily', // Частота изменения
    priority: 0.7, // Приоритет статичных страниц
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
    },
    additionalPaths: async (config) => {
        const dynamicRoutes = [];

        try {
            // Выполняем запрос к API
            const response = await fetch('https://hotelsblacksea.ru/api/apartments');

            if (!response.ok) {
                console.error(`Failed to fetch apartments: ${response.status} ${response.statusText}`);
                return dynamicRoutes;
            }

            // Парсим JSON-ответ
            const apartments = await response.json();

            // Создаём динамические маршруты для каждой квартиры
            apartments.data.forEach((apartment) => {
                dynamicRoutes.push({
                    loc: `/reservation/${apartment.id}`, // Динамический URL
                    lastmod: new Date().toISOString(), // Дата последнего изменения
                    changefreq: 'daily',
                    priority: 0.8, // Увеличенный приоритет для номеров
                });
            });
        } catch (error) {
            console.error(`Error fetching apartments: ${error.message}`);
        }
        return dynamicRoutes;
    },
};
