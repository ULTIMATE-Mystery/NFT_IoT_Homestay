import store, { appReducer } from 'store/Store';

export type StoreState = ReturnType<typeof appReducer>;

export type AppDispatch = typeof store.dispatch;
