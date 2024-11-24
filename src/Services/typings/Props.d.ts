import {ReactNode} from "react";

declare namespace IProps {
    type GlobalProvider = {
        children: ReactNode;
    }

    type GlobalContext = {
        user: IUser.Auth,
        cart: ICart.Global,
    }
}