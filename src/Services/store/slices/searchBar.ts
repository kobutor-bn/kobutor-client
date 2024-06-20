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

export const SearchState = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setIsFocused: (state, action: PayloadAction<boolean>) => {
            state.isFocused = action.payload;
        },
        handleOverlayClick: (state) => {
            state.isFocused = false;
        },
        handleInputFocus: (state) => {
            state.isFocused = true;
        },
        loadRecentSearches: (state) => {
            const searches = localStorage.getItem('recentSearches');
            state.recentSearches = searches ? JSON.parse(searches) : [];
        },
        saveRecentSearch: (state, action: PayloadAction<IProduct.Item>) => {
            const search = action.payload;
            state.recentSearches = [search, ...state.recentSearches.filter(item => item !== search)];
            localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
        },
        clearRecentSearches: (state) => {
            state.recentSearches = [];
            localStorage.removeItem('recentSearches');
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        }
    },
});

export const {
    setIsFocused,
    handleOverlayClick,
    handleInputFocus,
    loadRecentSearches,
    saveRecentSearch,
    clearRecentSearches,
    setSearchQuery,
} = SearchState.actions;

export default SearchState.reducer;