// Функция для установки Cookies
function setCookie(name, value, days) {
    // Создаем объект даты, чтобы задать срок действия Cookies
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Устанавливаем срок действия в днях

    // Формируем строку с параметром истечения срока
    const expires = `expires=${date.toUTCString()}`;

    // Получаем текущий домен динамически и убираем субдомен, если он есть
    const domainParts = window.location.hostname.split('.');
    const domain = domainParts.length > 2 
        ? domainParts.slice(-2).join('.') 
        : window.location.hostname;

    // Устанавливаем Cookie с именем, значением, сроком действия, доступностью для поддоменов и корневого пути
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; domain=.${domain}`;
}

// Функция для извлечения UTM-меток из URL
function getUTMParams() {
    // Создаем объект URLSearchParams для работы с параметрами запроса URL
    const params = new URLSearchParams(window.location.search);
    const utmParams = {}; // Объект для хранения UTM-меток

    // Список стандартных UTM-параметров, которые необходимо извлечь
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        // Проверяем наличие параметра в URL
        if (params.has(param)) {
            utmParams[param] = params.get(param); // Сохраняем параметр и его значение
        }
    });

    return utmParams; // Возвращаем объект с UTM-метками
}

// Основная логика для записи UTM-меток в Cookies
function storeUTMInCookies() {
    // Извлекаем UTM-метки из URL
    const utmParams = getUTMParams();

    // Записываем каждую UTM-метку в Cookies, если она присутствует
    for (const [key, value] of Object.entries(utmParams)) {
        setCookie(key, value, 30); // Устанавливаем срок хранения Cookies на 30 дней
    }
}

// Выполняем функцию при загрузке страницы для автоматической обработки
storeUTMInCookies();
