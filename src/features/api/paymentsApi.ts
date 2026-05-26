import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    initiateMpesaPayment: builder.mutation<  // ✅ < was missing
      { success: boolean; message: string; checkoutRequestId?: string },
      { userId?: number; orderId: number; amount: number; phoneNumber: string }
    >({
      query: (body) => ({
        url: "/payments/mpesa",
        method: "POST",
        body,
      }),
    }),

    initiateStripePayment: builder.mutation<  // ✅ < was missing
      { success: boolean; message: string; clientSecret?: string },
      { userId?: number; orderId: number; amount: number }
    >({
      query: (body) => ({
        url: "/payments/stripe",
        method: "POST",
        body,
      }),
    }),

    getUserPayments: builder.query<{ success: boolean; data: any[] }, number>({
      query: (userId) => `/payments/user?userId=${userId}`,
    }),

    getAllPayments: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => "/payments",
    }),
  }),
});

export const {
  useInitiateMpesaPaymentMutation,
  useInitiateStripePaymentMutation,
  useGetUserPaymentsQuery,
  useGetAllPaymentsQuery,
} = paymentsApi;