import moment from 'moment';

export const dateFormat = (date: string, format: string = 'DD/MM/YYYY') => {
    try {
        return date ? moment(date).format(format) : '--';
    } catch (error) {
        return '--';
    }
};

export const formatBoolean = (value: string) => {
    switch (value) {
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
