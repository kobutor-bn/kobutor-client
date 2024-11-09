import {useGetTaggedProductsQuery, useGetTagQuery, useGetTagsQuery} from "../apiSlice.ts";

export const useTaggedProducts = (title: string) => {
    const { data, error, isLoading }
        = useGetTaggedProductsQuery(title || '', {
        skip: !title,
    });

    const tagProducts: IProduct.Item[] = data!;

    return {
        tagProducts,
        isLoading,
        error,
    };
};

export const useTags = (params) => {
    const { data, error, isLoading } = useGetTagsQuery(params);
    const tags = data?.items;

    return {
        tags,
        isLoading,
        error,
    };
}

export const useTag = (id: string) => {
    const { data, error, isLoading } = useGetTagQuery(id);
    const tag = data;

    return {
        tag,
        isLoading,
        error,
    };
}