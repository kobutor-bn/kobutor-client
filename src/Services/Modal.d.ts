import React from "react";

declare namespace IModal {
    interface State {
        isOpen: boolean;
    }

    interface Props {
        children: React.ReactNode;
    }
}