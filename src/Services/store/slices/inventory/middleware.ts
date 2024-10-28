// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { createListenerMiddleware, AnyAction } from '@reduxjs/toolkit';
// import {RootState} from "../../index.tsx";
//
// export const fetchBestSellers = createAsyncThunk(
//     'tags/fetchBestSellers',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetch('/api/best-sellers');
//             if (!response.ok) throw new Error('Failed to fetch best sellers');
//             return await response.json();
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );
//
// export const bestSellerListener = (listenerMiddleware: ReturnType<typeof createListenerMiddleware>) => {
//     listenerMiddleware.startListening({
//         // Example: Listening for a route change action
//         actionCreator: (action: AnyAction) => action.type === '@router/LOCATION_CHANGE',
//         effect: async (action, listenerApi) => {
//             const state = listenerApi.getState() as RootState;
//
//             // Logic to conditionally dispatch the fetch
//             if (action.payload.location.pathname === '/best-sellers' && state.tags.items.length === 0) {
//                 await listenerApi.dispatch(fetchBestSellers());
//             }
//         },
//     });
// };