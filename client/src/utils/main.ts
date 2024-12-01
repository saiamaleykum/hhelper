


const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const date = new Date(dateString);
    const today = new Date();

    // Проверяем, совпадает ли дата с сегодняшним днем
    if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    ) {
        return `Сегодня в ${date.toLocaleString('ru-RU', options)}`;
    }

    // Если дата не сегодня, форматируем полностью
    options.year = 'numeric';
    options.month = 'long';
    options.day = 'numeric';

    return date.toLocaleString('ru-RU', options);
};

const formatSalary = (salary): string => {
    if (!salary) {
        return ''
    } 
    let currency = salary.currency
    if (currency === 'RUR') currency = 'RUB'
    if (currency === 'BYR') currency = 'BYN'
    const from = salary.from
    const to = salary.to

    if (from && to) return `${from}-${to} ${currency}`
    if (from && !to) return `от ${from} ${currency}`
    if (!from && to) return `до ${to} ${currency}`
};


export {formatDate, formatSalary};