class PagingUtil {
  static async formatForTable<T>(req: Promise<any>): Promise<T> {
    const r = await req;
    return this.formatPaging(r);
  }

  static formatParams(p: any) {
    try {
      const paging_fields = ['current', 'pageSize'];
      const keys = Object.keys(p);
      if (paging_fields.every((f) => keys.includes(f))) {
        const r = {
          page: p.current - 1,
          count: p.pageSize,
          ...p,
        };
        delete r.current;
        delete r.pageSize;
        return r;
      }
    } catch (_) { /* empty */ }

    return { ...p };
  }

  /**
   * 适配 antd pro 列表分页字段
   * @author zahin
   */
  private static formatPaging(data: any) {
    try {
      const paging_fields = ['total', 'count', 'page', 'items'];
      const keys = Object.keys(data);
      if (paging_fields.every((f) => keys.includes(f))) {
        return {
          data: data.items,
          current: data.page,
          pageSize: data.count,
          total: data.total,
          success: true,
        };
      }
    } catch (_) {}

    return { ...data };
  }
}

export default PagingUtil;