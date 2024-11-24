import React, {createContext, useContext} from 'react';
import {IProps} from "./Services/typings/Props";
import {useUser} from "./Services/store/hooks/user.ts";
import {InitCart} from "./Services/store/hooks/cart.ts";

// Create a single global context
const GlobalContext = createContext<IProps.GlobalContext | undefined>(undefined);

export const GlobalProvider: React.FC<IProps.GlobalProvider> = ({children}) => {
    const {user, isAuthenticated, isUserLoading} = useUser();
    const {cart, isCartLoading} = InitCart(isAuthenticated, isUserLoading);

    // Combine user and cart states
    const contextValue = {
        user: {
            user,
            isAuthenticated,
            isUserLoading,
        },
        cart: {
            cart,
            isCartLoading,
        }
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalUser must be used within a GlobalProvider");
    }

    const userCtx = context.user
    const cartCtx = context.cart
    return {userCtx, cartCtx};
};