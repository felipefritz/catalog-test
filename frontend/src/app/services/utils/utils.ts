import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';


export const getErrorMessageFromMutation = (error: FetchBaseQueryError | SerializedError | undefined): string | null => {
    if (error) {
      if ('status' in error) {
        return `Error ${error.status}: ${JSON.stringify(error.data)}`;
      } else if ('message' in error) {
        return error.message || null;
      }
    }
    return null;
  };


export const createCrudEndpoints = (builder: any, resourceConfig: any) => {
  const { resourceUrl, resourceTag } = resourceConfig;

  return {
    [`get${resourceTag}List`]: builder.query({
      query: () => `${resourceUrl}`,
      providesTags: [resourceTag],
    }),
    [`get${resourceTag}ById`]: builder.query({
      query: (id: any) => `${resourceUrl}/${id}`,
      providesTags: [resourceTag],
    }),
    [`create${resourceTag}`]: builder.mutation({
      query: (newData: any) => ({
        url: `${resourceUrl}`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: [resourceTag],
    }),
    [`update${resourceTag}`]: builder.mutation({
      query: ({ id, ...updateData }: any) => ({
        url: `${resourceUrl}/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: [resourceTag],
    }),
    [`delete${resourceTag}`]: builder.mutation({
      query: (id: any) => ({
        url: `${resourceUrl}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [resourceTag],
    }),
  };
};
