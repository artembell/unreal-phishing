import { configureStore } from '@reduxjs/toolkit';
import { attemptsReducer } from './slices/attempts.slice';
import { phishingApi } from '@/query/attempts';
import { authApi } from '@/query/auth';

export const store = configureStore({
    reducer: {
        attempts: attemptsReducer,
        [phishingApi.reducerPath]: phishingApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(phishingApi.middleware, authApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;