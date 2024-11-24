import {
    useAddCartMutation,
    useAddItemToCartMutation,
    useDecreaseItemFromCartMutation,
    useGetCartQuery,
    useRemoveItemFromCartMutation
} from "../apiSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../slices/auth.ts";
import {useCallback, useEffect} from "react";
import {cartSelector, setCart} from "../slices/cart.ts";

export const useCart = (user_id: string) => {
    const {data, isLoading, error}
        = useGetCartQuery(user_id, {
        skip: !user_id,
    });

    const cart = data ? data : null;

    return {
        cart,
        isLoading,
        error,
    };
};

export const InitCart = (isAuthenticated: boolean, isUserLoading: boolean) => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const cart = useSelector(cartSelector);

    const {data: cartData, isLoading: isCartFetching, error: cartError} = useGetCartQuery(user?.id, {
        skip: !isAuthenticated || isUserLoading || !user?.id,
    });

    const [addCart, {isLoading: isAddingCart}] = useAddCartMutation();

    const handleAuthenticatedCart = useCallback(async () => {
        if (!user?.id) return;
        if (cartData) {
            dispatch(setCart(cartData));
        } else if (!isCartFetching) {
            try {
                const response =
                    await addCart({
                        user_id: user.id,
                        items: [],
                        price: 0,
                    }).unwrap();
                dispatch(setCart(response));
            } catch (err) {
                console.error('Failed to create a new cart:', err);
            }
        }
    }, [user, cartData, isCartFetching, addCart, dispatch]);

    const handleUnauthenticatedCart = useCallback(async () => {
        try {
            const lsCart = localStorage.getItem('cart');
            if (lsCart) {
                const parsedCart = JSON.parse(lsCart);
                dispatch(setCart(parsedCart));
            } else {
                const response =
                    await addCart({
                        items: [],
                        price: 0,
                    }).unwrap();
                dispatch(setCart(response));
            }
        } catch (err) {
            console.error('Error reading cart from localStorage:', err);
        }
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && !isUserLoading) {
            handleAuthenticatedCart();
        } else if (!isAuthenticated) {
            handleUnauthenticatedCart();
        }
    }, [isAuthenticated, isUserLoading, handleAuthenticatedCart, handleUnauthenticatedCart]);

    const isCartLoading = isAuthenticated ? isCartFetching || isAddingCart : false;

    return {cart, isCartLoading, cartError};
};

export const useAddToCart = () => {
    const [addToCart, {isLoading, error}] = useAddItemToCartMutation();

    return {
        addToCart,
        isLoading,
        error,
    }
}

export const useDecreaseFromCart = () => {
    const [decreaseFromCart, {isLoading, error}] = useDecreaseItemFromCartMutation();

    return {
        decreaseFromCart,
        isLoading,
        error,
    }
}

export const useRemoveFromCart = () => {
    const [removeFromCart, {isLoading, error}] = useRemoveItemFromCartMutation();

    return {
        removeFromCart,
        isLoading,
        error,
    }
}