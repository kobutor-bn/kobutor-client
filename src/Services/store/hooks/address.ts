import {useAddAddrMutation, useGetAddrQuery, useRemoveAddrMutation, useUpdateAddrMutation} from "../apiSlice.ts";

export const useAddress = (id: string) => {
    const {data, isLoading, error} = useGetAddrQuery(id, {
        skip: !id,
    });

    const addresses = data ? data : [];

    return {
        addresses,
        isLoading,
        error,
    }
}

export const useCreateAddress = () => {
    const [addAddr, {isLoading, error}] = useAddAddrMutation();

    return {
        addAddr,
        isLoading,
        error,
    }
}

export const useUpdateAddress = () => {
    const [updateAddr, {isLoading, error}] = useUpdateAddrMutation();

    return {
        updateAddr,
        isLoading,
        error,
    }
}

export const useRemoveAddress = () => {
    const [removeAddr, {isLoading, error}] = useRemoveAddrMutation();

    return {
        removeAddr,
        isLoading,
        error,
    }
}