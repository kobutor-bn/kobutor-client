import { createApi } from '@reduxjs/toolkit/query/react';
import PagingUtil from '../util/PagingUtil';
import { baseQueryWithReauth } from "./auth.ts";
import {setUser} from "./slices/user.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<API.TokenResponse, IUser.LoginParams>({
            query: (credentials) => ({
                url: "/v1/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { access_token, refresh_token } = data;

                    localStorage.setItem("access_token", access_token!);
                    localStorage.setItem("refresh_token", refresh_token!);

                    await dispatch(apiSlice.endpoints.getUser.initiate());
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
        }),
        getUser: builder.query<IUser.Info, void>({
            query: () => ({
                url: '/cms/user/info',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;

                    // Set user data in Redux state
                    dispatch(setUser(res.data));
                    console.log("User Data:", res.data);
                } catch (error) {
                    console.error("Failed to fetch and set user data:", error);
                }
            },
        }),

        getProducts: builder.query<API.Paging<IProduct.Item>, ReturnType<typeof PagingUtil.formatParams>>({
            query: (category: string) => `/v1/product/paging?category=${category}`,
        }),

        getProductDetails: builder.query<API.Response<IProduct.Item>, string>({
            query: (id: string) => `/v1/product/${id}`,
        }),

        getTags: builder.query<API.Paging<ITag.Item>, ReturnType<typeof PagingUtil.formatParams>>({
            query: (params) => {
                const queryParams = new URLSearchParams(PagingUtil.formatParams(params)).toString();
                return `/v1/api/cms/tag/paging?${queryParams}`;
            },
            transformResponse: async (response: Response) => {
                const jsonResponse = await response.json();
                return PagingUtil.formatForTable<API.Paging<ITag.Item>>(jsonResponse);
            },
        }),

        getTaggedProducts: builder.query<API.Paging<ITag.BestSeller>, string>({
            query: (id) => `/v1/product/tag/${id}`,
            transformResponse: async (response: Response) => {
                const jsonResponse = await response.json();
                return PagingUtil.formatForTable<API.Paging<ITag.BestSeller>>(jsonResponse);
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useGetUserQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useLazyGetProductsQuery,
    useGetTagsQuery,
    useGetTaggedProductsQuery,
} = apiSlice;