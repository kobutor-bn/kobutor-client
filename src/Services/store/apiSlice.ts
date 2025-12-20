import {createApi} from '@reduxjs/toolkit/query/react';
import PagingUtil from '../util/PagingUtil';
import {baseQueryWithReauth} from "./auth.ts"; // CHANGED: Use baseQueryWithReauth
import {setUser} from "./slices/auth.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth, // CHANGED: Use the reauth version
    tagTypes: ['User', 'Cart', 'Review', 'Address', 'Favorites', 'Order'],
    endpoints: (builder) => ({
        getCart: builder.query<ICart.Item, string>({
            query: (user_id) => ({
                url: `/v1/cart/${user_id}`,
            }),
            providesTags: ['Cart'],
        }),

        addCart: builder.mutation<ICart.Item, ICart.Create>({
            query: (item: ICart.Create) => ({
                url: `/v1/cart`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        addItemToCart: builder.mutation<void, { id: string; item: ICart.Product }>({
            query: ({id, item}) => ({
                url: `/v1/cart/item/${id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        decreaseItemFromCart: builder.mutation<void, { id: string; product_id: string }>({
            query: ({id, product_id}) => ({
                url: `/v1/cart/item/${id}`,
                method: 'PATCH',
                body: {product_id},
            }),
            invalidatesTags: ['Cart'],
        }),

        removeItemFromCart: builder.mutation<void, { id: string; product_id: string }>({
            query: ({id, product_id}) => ({
                url: `/v1/cart/${id}/item`,
                method: 'PUT',
                body: {product_id},
            }),
            invalidatesTags: ['Cart'],
        }),

        updateUserInfo: builder.mutation<void, IUser.Update>({
            query: (item) => ({
                url: `/v1/user`,
                method: "PUT",
                body: item,
            }),
            invalidatesTags: ['User'],
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

                    // Store tokens
                    if (access_token) localStorage.setItem("access_token", access_token);
                    if (refresh_token) localStorage.setItem("refresh_token", refresh_token);

                    // Fetch user data immediately after login
                    await dispatch(apiSlice.endpoints.getUser.initiate());
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
            invalidatesTags: ['User'],
        }),

        // NEW: Logout endpoint
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/v1/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, {dispatch}) {
                // Clear local storage
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                // Reset the entire API cache
                dispatch(apiSlice.util.resetApiState());
            },
        }),

        getUser: builder.query<IUser.Info, void>({
            query: () => ({
                url: '/cms/user/info',
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const res = await queryFulfilled;
                    dispatch(setUser(res.data));
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    // Clear tokens if user fetch fails
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                }
            },
            providesTags: ['User'],
        }),

        setAvatar: builder.mutation<{ avatar: string; path: string }, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/v1/user/avatar',
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['User'],
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

        getAddr: builder.query<Array<IAddress.Item>, string>({
            query: (id) => `/v1/address/user/${id}`,
            providesTags: ['Address']
        }),

        addAddr: builder.mutation<void, IAddress.Create>({
            query: (data: IAddress.Create) => ({
                url: '/v1/address',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),

        updateAddr: builder.mutation<void, IAddress.Update>({
            query: (data: IAddress.Update) => ({
                url: '/v1/address',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),

        removeAddr: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/v1/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address']
        }),

        getFavorites: builder.query<Array<IProduct.Item>, void>({
            query: () => `/v1/user/favorites`,
            providesTags: ['Favorites']
        }),

        addFavorite: builder.mutation<void, string>({
            query: (product_id: string) => ({
                url: `/v1/user/favorites/add/${product_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Favorites']
        }),

        removeFavorite: builder.mutation<void, string>({
            query: (product_id: string) => ({
                url: `/v1/user/favorites/remove/${product_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Favorites']
        }),

        getOrderDetailsHistory: builder.query<IOrder.Item, string>({
            query: (id: string) => `/v1/order/${id}`,
            providesTags: ['Order'],
        }),

        getOrderHistory: builder.query<IOrder.Item[], void>({
            query: () => `/v1/order/history`,
            providesTags: ['Order'],
        }),

        createOrder: builder.mutation<IOrder.Item, IOrder.Item>({
            query: (data: IOrder.Item) => ({
                url: `/v1/order`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Order']
        }),
    }),
});

export const {
    useGetOrderDetailsHistoryQuery,
    useGetOrderHistoryQuery,
    useCreateOrderMutation,
    useUpdateAddrMutation,
    useRemoveAddrMutation,
    useSetAvatarMutation,
    useDecreaseItemFromCartMutation,
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
    useAddAddrMutation,
    useGetAddrQuery,
    useUpdateUserInfoMutation,
    useAddCartMutation,
    useAddItemToCartMutation,
    useRemoveItemFromCartMutation,
    useAddReviewMutation,
    useGetReviewsQuery,
    useGetReviewDetailsQuery,
    useLoginMutation,
    useLogoutMutation, // NEW
    useGetUserQuery,
    useLazyGetProductsQuery,
    useGetTagsQuery,
    useGetTagQuery,
    useGetTaggedProductsQuery,
    useGetCartQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
} = apiSlice;