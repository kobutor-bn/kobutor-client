/**
 * @author zahin
 */
declare namespace API {
    type Response<T> = {
        code: number;
        message: string;
        request?: string;
        items?: T[];
        item?: T;
    };

    type TokenResponse = {
        access_token: string | null;
        refresh_token: string | null;
    };

    type Paging<T> = {
        total: number;
        count: number;
        page: number;
        total_page: number;
        items: T[];

        current: number;
        data: T[];
        pageSize: number;
        success: boolean;
    };
}