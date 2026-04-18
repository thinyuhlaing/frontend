import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "@/lib/config";
import { createBaseQueryWithReauth } from "@/modules/base/utils/api";

const baseQueryWithReauth = createBaseQueryWithReauth(
  `${config.appApiBaseUrl}/base`,
);

export const baseApi = createApi({
  reducerPath: "baseApi",
  //   baseQuery: baseQueryWithReauth,
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.appApiBaseUrl}/base/auth`,
  }),

  endpoints: (builder) => ({
    // login: builder.mutation({
    //   query: (payload) => ({
    //     url: `/login`,
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: `/logout`,
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const {
  //  useLoginMutation, useLogoutMutation
} = baseApi;
