import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {logout, setAuthenticated} from "./slices/auth.ts";
import {Mutex} from "async-mutex";

// Create a mutex to prevent multiple refresh attempts
const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
    credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Check if another request is already refreshing
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                // Try to get a new token using refresh token
                const refreshResult = await baseQuery(
                    {
                        url: "/v1/token/refresh",
                        method: "POST",
                        body: {
                            refresh_token: localStorage.getItem("refresh_token")
                        }
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    const {access_token} = refreshResult.data as API.TokenResponse;

                    // Store the new token
                    localStorage.setItem("access_token", access_token!);

                    // Retry the initial query with new token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // Refresh failed - logout user
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    api.dispatch(logout());
                    api.dispatch(setAuthenticated(false));
                }
            } finally {
                // Release the mutex
                release();
            }
        } else {
            // Wait for the refresh to complete
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    // Format 400 errors for user-friendly display
    if (result.error && result.error.status === 400) {
        const errorData = result.error.data as API.Response<null>;
        if (errorData?.message && typeof errorData.message === 'object') {
            errorData.message = Object.entries(errorData.message)
                .map(([key, val]) => `${key}: ${val}`)
                .join(', ');
        }
    }

    return result;
};