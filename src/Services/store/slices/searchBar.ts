// searchBar.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SearchState {
    isFocused: boolean;
    recentSearches: IProduct.Item[];
    searchQuery: string;
}

const initialState: SearchState = {
    isFocused: false,
    recentSearches: [],
    searchQuery: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setFocus(state, action: PayloadAction<boolean>) {
            state.isFocused = action.payload;
        },
        closeOverlay(state) {
            state.isFocused = false;
        },
        addRecentSearchFromStorage(state) {
            const storedSearches = localStorage.getItem('recentSearches');
            state.recentSearches = storedSearches ? JSON.parse(storedSearches) : [];
        },
        addRecentSearch(state, action: PayloadAction<IProduct.Item>) {
            const newSearch = action.payload;
            state.recentSearches = [newSearch, ...state.recentSearches.filter(item => item.id !== newSearch.id)];
            localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
        },
        clearSearchHistory(state) {
            state.recentSearches = [];
            localStorage.removeItem('recentSearches');
        },
        updateQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
});

export const {
    setFocus,
    closeOverlay,
    addRecentSearchFromStorage,
    addRecentSearch,
    clearSearchHistory,
    updateQuery,
} = searchSlice.actions;

export default searchSlice.reducer;