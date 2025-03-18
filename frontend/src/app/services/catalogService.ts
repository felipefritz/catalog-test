import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createCrudEndpoints } from './utils/utils';

const API_URL = import.meta.env.VITE_APP_API_URL;
const getToken = () => localStorage.getItem('access_token');

export const CatalogAPI = createApi({
  reducerPath: 'CatalogAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const access_token = getToken();
      if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
        headers.set('Accept', `application/json`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Catalog',
  ],
  endpoints: (builder) => ({
    ...createCrudEndpoints(builder, { resourceUrl: 'catalog', resourceTag: 'Catalog' }),
  }),
});

export const {
  useGetCatalogListQuery,
  useGetCatalogListLazyQuery,
  useGetCatalogByIdQuery,
  useCreateCatalogMutation,
  useUpdateCatalogMutation,
  useDeleteCatalogMutation,



} = CatalogAPI;

