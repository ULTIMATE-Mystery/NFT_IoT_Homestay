import { userActions } from 'reducers/user';
import store, { storeActions } from 'store/Store';

export const createUser = (name: string) => {
    if (getUsername() === name) return null;
    storeActions.dispatch(userActions.INIT_USER, { name });
};

export const renameUser = (newFirstName: string, newLastName: string) => {
    if (getFirstName() === newFirstName && getLastName() === newLastName) {
        return null;
    }
    storeActions.dispatch(userActions.RENAME_USER, {
        firstName: newFirstName,
        lastName: newLastName,
    });
};

export const changeEmail = (newEmail: string) => {
    if (getEmail() === newEmail) return null;
    storeActions.dispatch(userActions.CHANGE_EMAIL, { newEmail });
};

export const getUsername = () => {
    return store.getState()?.user?.username;
};

export const getFirstName = () => {
    return store.getState()?.user?.firstName;
};

export const getLastName = () => {
    return store.getState()?.user?.lastName;
};

export const getEmail = () => {
    return store.getState()?.user?.email;
};
