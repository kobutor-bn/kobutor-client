import React from "react";

declare namespace IMenu {
    interface State {
        isMenuOpen: boolean;
    }

    interface Props {
        trigger: React.ReactNode;
        body: React.ReactNode;
    }
}