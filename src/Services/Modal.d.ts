import React from "react";

declare namespace IModal {
    interface State {
        isMenuOpen: boolean;
        isModalOpen: boolean;
    }

    interface Props {
        trigger: React.ReactNode;
        body: React.ReactNode;
    }
}