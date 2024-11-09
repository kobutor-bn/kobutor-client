import {IntlShape, useIntl} from 'react-intl';
import {queryHooksMap} from "../store/apiSlice.ts";


type LocalizedItem<T> = T & { [key: string]: string };

export function localizeResponse<T extends Record<string, any>>(
    item: T,
    formatMessage: IntlShape['formatMessage']
): LocalizedItem<T> {
    const localizedItem: Partial<LocalizedItem<T>> = {...item};

    Object.keys(item).forEach((key) => {
        if (key.endsWith('_id') && typeof item[key] === 'string') {
            const messageId = item[key] as string;
            const localizedKey = key.replace('_id', ''); // Transform "name_id" -> "name"
            localizedItem[localizedKey] = formatMessage({id: messageId, defaultMessage: messageId});
        }
    });

    return localizedItem as LocalizedItem<T>;
}

interface FetchAndLocalizeOptions {
    endpointType: keyof typeof queryHooksMap;
    params?: any;
}

export const useFetchAndLocalizeData = <T>({endpointType, params}: FetchAndLocalizeOptions) => {
    const {formatMessage} = useIntl();
    const queryHook = queryHooksMap[endpointType];

    if (!queryHook) throw new Error(`Unsupported endpoint type: ${endpointType}`);

    const {data, error, isLoading} = queryHook(params);
    const localizedData = data?.items?.map((item: T) => localizeResponse(item, formatMessage));

    return {data: localizedData, isLoading, error};
};