import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TagService} from "./index.ts";

const initialState: ITag.State = {
    items: [],
    status: 'idle',
    error: null
};

export const query = createAsyncThunk(
    'tags/query',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = TagService.query(id);
            return response.then(data => data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const TagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(query.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(query.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items.push(...action.payload.items)
            })
            .addCase(query.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message ?? 'Unknown Error'
            })
    },
})

// Action creators are generated for each case reducer function
// export const {} = BestSellerSlice.actions

export default TagSlice.reducer