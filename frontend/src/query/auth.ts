import { TLoginData, TRegisterData } from '@/shared/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${'localhost'}/api/`,
        prepareHeaders(headers) {
            return headers;
        },
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getProfileSilent: builder.query<{ email: string; }, void>({
            query: () => ({
                url: 'auth/profile',
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        login: builder.mutation<void, Partial<TLoginData>>({
            query: ({ email, password }) => ({
                url: 'auth/login',
                method: 'POST',
                body: { email, password },
            })
        }),
        register: builder.mutation<void, Partial<TRegisterData>>({
            query: ({ email, password }) => ({
                url: 'auth/register',
                method: 'POST',
                body: { email, password },
            })
        }),
        signout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/signout',
                method: 'POST'
            })
        })
    }),
});

export const { useGetProfileSilentQuery, useSignoutMutation, useLoginMutation, useRegisterMutation } = authApi;