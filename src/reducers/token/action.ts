import { storeActions } from 'store/Store';
import { tokenActions } from '.';

export const setToken = (token?: string) => {
    storeActions.dispatch(tokenActions.SET_ACCESS_TOKEN, token);
};

export const getToken = () => {
    return storeActions.getState()?.token?.accessToken;
};
