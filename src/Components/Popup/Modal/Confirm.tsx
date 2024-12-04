import React from 'react';
import Button from "../../Button.tsx";
import {TypedMutationTrigger} from "@reduxjs/toolkit/query/react";

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // mutation: MutationTrigger<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>>;
    mutation: TypedMutationTrigger<any, any, any>;
    mutationParams: Record<string, any>
}

const Confirm: React.FC<Props> = ({setIsOpen, mutation, mutationParams}) => {
    console.log(mutationParams)
    return (
        <div className="flex w-full flex-col gap-8">
            <p className="text-lg text-center font-bold">Are you sure?</p>
            <div className="flex flex-grow w-full gap-3">
                <Button onClick={() => setIsOpen(false)} className="w-full" text={'No'} color="secondary"
                        size={'large'}/>
                <Button
                    onClick={() =>
                        mutation(mutationParams)
                            .then(() => setIsOpen(false))
                    }
                    className="w-full" text={'Yes'} color="primary" size={'large'}/>
            </div>
        </div>
    );
};

export default Confirm;