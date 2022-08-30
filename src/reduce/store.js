import { configureStore } from '@reduxjs/toolkit';
import contactReduce from './reduce';
import { contactApi } from '../services/fetchApi';

export const store = configureStore({
    reducer: {
        contactReduce: contactReduce,
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactApi.middleware),
});


