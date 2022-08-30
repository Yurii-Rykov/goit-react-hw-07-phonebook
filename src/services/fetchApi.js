import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://630df2e1109c16b9abf141c1.mockapi.io/contacts',
  }),
  tagTypes: ['contact'],
  endpoints: builder => ({
    getContactsName: builder.query({
      query: () => `/contacts`,
      providesTags: ['contact'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contact'],
  }),
  }),
});

export const { useGetContactsNameQuery, useDeleteContactMutation } = contactApi;
