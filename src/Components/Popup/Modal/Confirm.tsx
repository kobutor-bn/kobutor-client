import React from 'react';
import Button from "../../Button.tsx";

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mutation: (params: any) => Promise<any>;
    mutationParams: any;
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