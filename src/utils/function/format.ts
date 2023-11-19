import moment from 'moment';

export const dateFormat = (
    date: string | number,
    format: string = 'DD/MM/YYYY'
) => {
    try {
        return date ? moment(date.toString()).format(format) : '--';
    } catch (error) {
        return '--';
    }
};

export const formatBoolean = (value: string) => {
    switch (value.toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        case 'on':
            return true;
        case 'off':
            return false;
        case '0':
            return false;
        case '1':
            return true;
        default:
            return false;
    }
};

export const shortenString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
};

export const getTimestampAgo = (date: Date) => {
    const ago = moment(date);
    const diff = moment().diff(ago, 'minutes');

    if (diff <= 0) {
        return '<1 minute ago';
    } else if (diff > 0 && diff < 60) {
        return `${diff} minutes ago`;
    } else if (diff >= 60 && diff < 60 * 24) {
        return `${Math.floor(diff / 60)} hours ago`;
    } else {
        return `${Math.floor(diff / (60 * 24))} days ago`;
    }
};

