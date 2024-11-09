declare namespace ITag {
    interface Item {
        id: string,
        name: string,
        desc: string,
        is_public: true,
        used_in: string[],
        created_at: number,
        updated_at: number,
    }

    interface State {
        items: Item[];
        status: 'idle' | 'pending' | 'succeeded' | 'rejected'
        error: string | null
    }
}