/**
 * @author zahin
 */
import PagingUtil from "../../util/PagingUtil.ts";

export class TagService {
    static query(data: any) {
        const queryParams = new URLSearchParams(PagingUtil.formatParams(data)).toString();
        const url = `/api/cms/tag/paging?${queryParams}`;
        return PagingUtil.formatForTable<API.Paging<ITag.Item>>(
            fetch(url)
        );
    }

    static detail(id: string) {
        const url = `/api/v1/product/tag/${id}`;
        return PagingUtil.formatForTable<API.Paging<ITag.BestSeller>>(
            fetch(url)
        );
    }
}