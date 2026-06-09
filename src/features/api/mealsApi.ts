import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://foodiehub-backend-1-t03u.onrender.com/api/', 
    prepareHeaders: (headers, {getState})=>{
      const token = (getState() as RootState).auth.token;
      if (token){
        headers.set('Authorization', `${token}`);
      }
      headers.set(`Content-Type`, `application/json`);
      return headers;
    }
  }),
  refetchOnReconnect:true,
  refetchOnMountOrArgChange:true,
  
  tagTypes: ['meals', 'meal'],
  endpoints: (builder) => ({
    createMeal: builder.mutation({
      query: (createMealPayload) => ({
        url: 'meals',
        method: 'POST',
        body: createMealPayload,
      }),
      invalidatesTags: ["meals"]
    }),
    updateMeal: builder.mutation({
      query: ({mealId, ...body}) => ({
        url: `meals/${mealId}`,
        method: 'PUT',
        body
      }),
      invalidatesTags:["meals"]
    }),
    getAllMeals: builder.query({
      query: () => 'meals',
      providesTags: ["meals"]
    }),
    getAllMealById: builder.query({
      query: (mealId) => `meals/${mealId}`,
    }),
    deleteMeal: builder.mutation({
      query: (mealId) => ({
        url: `meals/${mealId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['meals']
    }),
  }),
});
