import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './index';

export const listenerMiddleware = createListenerMiddleware();

// Use withTypes to specify RootState and AppDispatch explicitly
export const startAppListening = listenerMiddleware.startListening.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
}>();