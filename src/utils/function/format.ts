import moment from 'moment';

export const dateFormat = (date: string, format: string = 'DD/MM/YYYY') => {
    try {
        return date ? moment(date).format(format) : '--';
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

export const getMinutesAgo = (date: Date) => {
    const ago = moment(date);
    const diff = moment().diff(ago, 'minutes');

    if (diff <= 0) {
        return '<1';
    }
    return diff.toString();
};
