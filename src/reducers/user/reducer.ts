import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, UserState } from './type';

const initialState: UserState = new UserState();

interface UserCaseReducer<P> extends CaseReducer<UserState, PayloadAction<P>> {}

const INIT_USER: UserCaseReducer<IUserState> = (_s, { payload }) => {
    return new UserState(payload);
};

const RENAME_USER: UserCaseReducer<any | undefined> = (state, { payload }) => {
    return {
        ...state,
        firstName: payload?.firstName ?? '',
        lastName: payload?.lastName ?? '',
    };
};

const CHANGE_EMAIL: UserCaseReducer<string | undefined> = (
    state,
    { payload }
) => {
    return {
        ...state,
        email: payload ?? '',
    };
};

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        INIT_USER,
        RENAME_USER,
        CHANGE_EMAIL,
    },
});

export default UserSlice;
