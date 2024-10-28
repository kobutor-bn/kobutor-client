import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TagService} from "../index.ts";

const initialState: ITag.BestSellerState = {
    items: [],
    status: 'idle',
    error: null
};

export const detail = createAsyncThunk(
    'tags/query',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = TagService.detail(id);
            return response.then(data => data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const BestSellerSlice = createSlice({
    name: 'bestSeller',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(detail.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(detail.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items.push(...action.payload.items)
            })
            .addCase(detail.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message ?? 'Unknown Error'
            })
    },
})

// Action creators are generated for each case reducer function
// export const {} = BestSellerSlice.actions

export default BestSellerSlice.reducer