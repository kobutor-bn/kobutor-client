import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {logout} from "./slices/auth.ts";

const baseQuery = fetchBaseQuery({
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


// Proactive silent token refresh
export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Attempt to refresh token using cookies (handled server-side)
        const refreshResult = await baseQuery({ url: "/v1/token/refresh", method: "POST" }, api, extraOptions);

        if (refreshResult.data) {
            const { access_token } = refreshResult.data as API.TokenResponse;
            localStorage.setItem("access_token", access_token!);

            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            api.dispatch(logout());
        }
    }

    // Format 400 errors for user-friendly display
    if (result.error && result.error.status === 400) {
        const errorData = result.error.data as API.Response<null>;
        if (errorData.message && typeof errorData.message === 'object') {
            errorData.message = Object.entries(errorData.message)
                .map(([key, val]) => `${key}: ${val}`)
                .join(', ');
        }
    }

    return result;
};