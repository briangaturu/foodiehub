import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://foodiehub-backend-1-t03u.onrender.com/api/'}),
    tagTypes: ['users'],
    endpoints:(builder)=>({
        registerUser:builder.mutation({
query:(registerPayload)=>({
    url:'auth/register',
    method:'POST',
    body:registerPayload
}),
        }),
        loginUser:builder.mutation({
            query:(loginPayload)=>({
                url:'auth/login',
                method:'POST',
                body:loginPayload
            })
        }),
        getAllUsers: builder.query({
      query: () => 'users',
      providesTags: ['users']
    }),

        
    })
})