import React from "react";

declare namespace IMenu {
    interface State {
        isOpen: boolean;
    }

    interface Props {
        trigger: React.ReactNode;
        body: React.ReactNode;
    }
}