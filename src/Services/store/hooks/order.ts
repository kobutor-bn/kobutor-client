import {useCreateOrderMutation, useGetOrderDetailsHistoryQuery, useGetOrderHistoryQuery} from "../apiSlice.ts";

export const useOrderHistory = () => {
    const {data, isLoading, error}
        = useGetOrderHistoryQuery();

    const orders = data;

    return {
        orders,
        isLoading,
        error,
    };
};

export const useOrderDetailsHistory = (id: string) => {
    const {data, isLoading, error}
        = useGetOrderDetailsHistoryQuery(id);

    const item = data;

    return {
        item,
        isLoading,
        error,
    };
};

export const useCreateOrder = () => {
    const [trigger, {isLoading, error}]
        = useCreateOrderMutation();

    const createOrder = trigger;

    return {
        createOrder,
        isLoading,
        error,
    };
};