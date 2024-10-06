import { TAttackAttemptPayload, TAttempt } from '@/shared/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phishingApi = createApi({
    reducerPath: 'phishingApi',
    tagTypes: ['Attempts'],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${'localhost'}/api/`,
        prepareHeaders(headers) {
            return headers;
        },
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAttempts: builder.query<{ attempts: TAttempt[]; }, string>({
            query: () => ({
                url: 'phishing/attempts',
                method: 'GET'
            }),
            providesTags: ['Attempts'],
        }),
        initatePhishingAttack: builder.mutation<TAttackAttemptPayload, Partial<TAttackAttemptPayload>>({
            query: ({ email }) => ({
                url: 'phishing/send',
                method: 'POST',
                body: { email },
            }),
            invalidatesTags: ['Attempts']
        }),
    }),
});

export const { useGetAttemptsQuery, useInitatePhishingAttackMutation } = phishingApi;