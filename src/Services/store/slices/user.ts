import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    favorites: IProduct.Item[];
}

// const initialState: UserState | null = null;

export const UserSlice = createSlice({
    name: 'user',
    initialState: null as UserState | null,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            console.log({...(state), ...action.payload});

            if (state !== null) {
                return {...(state), ...action.payload};
            }
            return action.payload;
        },

        unsetUser: () => null,

        addFavorite: (state, action: PayloadAction<IProduct.Item>) => {
            if (state !== null) {
                (state as UserState).favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            if (state !== null) {
                (state as UserState).favorites = (state as UserState).favorites.filter(fav => fav.id !== action.payload);
            }
        }
    },
});

export const {addFavorite, removeFavorite, setUser, unsetUser} = UserSlice.actions;

export default UserSlice.reducer;