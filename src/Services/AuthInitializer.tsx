import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetUserQuery} from '../Services/store/apiSlice';
import {isInitializedSelector, logout, setInitialized} from "./store/slices/auth.ts";

/**
 * AuthInitializer - Handles authentication state on app mount
 * Place this component near the root of your app (in App.tsx or main router)
 */
export const AuthInitializer = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch();
    const isInitialized = useSelector(isInitializedSelector);
    const hasToken = !!localStorage.getItem('access_token');

    // Only fetch user if we have a token and haven't initialized yet
    const {isLoading, isError} = useGetUserQuery(undefined, {
        skip: !hasToken || isInitialized,
    });

    useEffect(() => {
        if (!hasToken && !isInitialized) {
            // No token - mark as initialized immediately
            dispatch(setInitialized());
        } else if (hasToken && isError && !isInitialized) {
            // Token exists but user fetch failed - clear auth
            dispatch(logout());
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }, [hasToken, isError, isInitialized, dispatch]);

    // Show loading state only on first mount while checking auth
    if (!isInitialized && hasToken && isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};