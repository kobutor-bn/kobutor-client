import {createApi} from '@reduxjs/toolkit/query/react';
import PagingUtil from '../util/PagingUtil';
import {baseQuery} from "./auth.ts";
import {setUser} from "./slices/user.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['User', 'Cart', 'Review'],
    endpoints: (builder) => ({
        getCart: builder.query<ICart.Item, string>({
            query: (user_id) => ({
                url: `/v1/cart/${user_id}`,
            }),
            providesTags: ['Cart'],
        }),

        addCart: builder.mutation<ICart.Item, void>({
            query: () => ({
                url: `/v1/cart`,
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),

        addCartById: builder.mutation<ICart.Item, string>({
            query: (user_id) => ({
                url: `/v1/cart/${user_id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),

        addItemToCart: builder.mutation<void, { user_id: string; item: ICart.Item }>({
            query: ({user_id, item}) => ({
                url: `/v1/cart/${user_id}/add`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        removeItemFromCart: builder.mutation<void, { cart_id: string; item: ICart.Item }>({
            query: ({cart_id, item}) => ({
                url: `/v1/cart/remove/${cart_id}`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        updateUserInfo: builder.mutation<void, any>({
            query: (item) => ({
                url: `/cms/user/${item.id}`,
                method: "PUT",
                body: item,
            }),
        }),

        login: builder.mutation<API.TokenResponse, IUser.LoginParams>({
            query: (credentials) => ({
                url: "/v1/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    const {access_token, refresh_token} = data;

                    localStorage.setItem("access_token", access_token!);
                    localStorage.setItem("refresh_token", refresh_token!);

                    await dispatch(apiSlice.endpoints.getUser.initiate());
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
            invalidatesTags: ['User'],
        }),

        getUser: builder.query<IUser.Info, void>({
            query: () => ({
                url: '/cms/user/info',
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const res = await queryFulfilled;
                    console.log("User Data:", res.data);

                    dispatch(setUser(res.data));
                } catch (error) {
                    console.error("Failed to fetch and set user data:", error);
                }
            },
            providesTags: ['User'],
        }),

        getProducts: builder.query<API.Paging<IProduct.Item>, any>({
            query: (params) => ({
                url: '/v1/product/paging',
                params: {
                    ...params,
                },
            }),
        }),

        getProductDetails: builder.query<IProduct.Item, string>({
            query: (id: string) => `/v1/product/${id}`,
        }),

        getTags: builder.query<API.Paging<ITag.Item>, ReturnType<typeof PagingUtil.formatForTable<API.Paging<ITag.Item>>>>({
            query: (data) => ({
                url: `/v1/tag/paging`,
                ...PagingUtil.formatParams(data),
            }),
        }),

        getTag: builder.query<ITag.Item, string>({
            query: (id: string) => `/v1/tag/${id}`,
        }),

        getTaggedProducts: builder.query<IProduct.Item[], string>({
            query: (id) => `/v1/product/tag/${id}`,
        }),

        getReviewDetails: builder.query<IReview.Response, string>({
            query: (id) => `/v1/review/${id}`,
            providesTags: ['Review']
        }),

        getReviews: builder.query<API.Paging<IReview.Item>, any>({
            query: (params) => ({
                url: '/v1/review/paging',
                params: {
                    ...params,
                },
            }),
            providesTags: ['Review']
        }),

        addReview: builder.mutation<void, IReview.Create>({
            query: (data: IReview.Create) => ({
                url: '/v1/review',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useUpdateUserInfoMutation,
    useAddCartByIdMutation,
    useAddCartMutation,
    useAddItemToCartMutation,
    useRemoveItemFromCartMutation,
    useAddReviewMutation,
    useGetReviewsQuery,
    useGetReviewDetailsQuery,
    useLoginMutation,
    useGetUserQuery,
    useLazyGetProductsQuery,
    useGetTagsQuery,
    useGetTagQuery,
    useGetTaggedProductsQuery,
    useGetCartQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
} = apiSlice;

export const queryHooksMap = {
    getCart: useGetCartQuery,
    getProducts: useGetProductsQuery,
    getProductDetails: useGetProductDetailsQuery,
    updateUserInfo: useUpdateUserInfoMutation,
    addCartById: useAddCartByIdMutation,
    addCart: useAddCartMutation,
    addItemToCart: useAddItemToCartMutation,
    removeItemFromCart: useRemoveItemFromCartMutation,
    addReview: useAddReviewMutation,
    getReviews: useGetReviewsQuery,
    getReviewDetails: useGetReviewDetailsQuery,
    login: useLoginMutation,
    getUser: useGetUserQuery,
    lazyGetProducts: useLazyGetProductsQuery,
    getTags: useGetTagsQuery,
    getTagsQuery: useGetTagQuery,
    getTaggedProducts: useGetTaggedProductsQuery,
};