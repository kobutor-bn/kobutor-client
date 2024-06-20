import React from "react";

declare namespace IModal {
    interface State {
        isModalOpen: boolean;
    }

    interface Props {
        trigger: React.ReactNode;
        body: React.ReactNode;
    }
}