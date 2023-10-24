import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenState } from 'reducers/token/type';

const initialState: TokenState = {
    accessToken: '',
};

interface TokenCaseReducer<P>
    extends CaseReducer<TokenState, PayloadAction<P>> {}

const SET_ACCESS_TOKEN: TokenCaseReducer<string | undefined> = (
    state,
    { payload }
) => {
    return {
        ...state,
        accessToken: payload ?? '',
    };
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        SET_ACCESS_TOKEN,
    },
});

export default tokenSlice;
