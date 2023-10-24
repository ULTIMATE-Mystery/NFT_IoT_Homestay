import reducers from 'reducers';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { StoreState } from './type';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

export const appReducer = combineReducers(reducers);

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<StoreState>(persistConfig, appReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddware => {
        return getDefaultMiddware({
            serializableCheck: false,
        });
    },
});

const getState = () => store.getState();

store.subscribe(() => {
    console.log('STORE', store.getState());
});

export default store;

export const dispatch = store.dispatch;

export const persistor = persistStore(store);

export const storeActions = {
    getState,
    dispatch: (type: any, payload: any) => {
        store.dispatch({
            type,
            payload,
        });
    },
};
