import {useState} from "react";
import Modal from "../Popup/Modal";
import Button from "../../Components/Button";
import {useAddress, useCreateAddress, useRemoveAddress, useUpdateAddress} from "../../Services/store/hooks/address.ts";
import {useGlobal} from "../../GlobalProvider.tsx";
import {createAddrFormConfig} from "../Form/config.ts";
import {createAddrSchema} from "../Form/schema.ts";
import {z} from "zod";
import Form from "../Form";
import {useFormMutation} from "../../Services/store/hooks/form.ts";

function Address() {
    const {userCtx} = useGlobal();
    const [currentAddress, setCurrentAddress] = useState<IAddress.Item>();

    // Hooks
    const {addAddr} = useCreateAddress();
    const {updateAddr} = useUpdateAddress();
    const {addresses} = useAddress(userCtx.user!.id);
    const {removeAddr} = useRemoveAddress();
    const {
        request, isCreateOpen, isUpdateOpen,
        setIsUpdateOpen, setIsCreateOpen
    }
        = useFormMutation();

    const createConfig = {
        ...createAddrFormConfig,
        schema: createAddrSchema,
        onSubmit: async (values: z.infer<typeof createAddrSchema>) => {
            const createAddrValues: IAddress.Create = {
                ...values,
                user_id: userCtx.user!.id,
            };

            await request("create", addAddr, createAddrValues);
        },
    };

    const updateConfig = {
        ...createAddrFormConfig,
        schema: createAddrSchema,
        onSubmit: async (values: z.infer<typeof createAddrSchema>) => {
            if (!currentAddress) {
                console.error("Current address is null.");
                return;
            }

            const updateAddrValues: IAddress.Update = {
                ...values,
                id: currentAddress.id!,
                user_id: userCtx.user!.id,
            };

            await request("update", updateAddr, updateAddrValues);
        },
        defaultValues: currentAddress,
    };

    const updateAddress = (addr: IAddress.Item) => {
        return <Modal
            isOpen={isUpdateOpen}
            setIsOpen={setIsUpdateOpen}
            trigger={
                <div className="inline-block">
                    <button onClick={() => setCurrentAddress(addr)} className="text-blue-500 hover:underline">
                        Edit
                    </button>
                </div>
            }
            body={<Form title="Edit Address" {...updateConfig} />}
        />
    };

    const removeAddress = (id: string) => (
        <button onClick={() => removeAddr(id)} className="text-red-500 hover:underline">
            Delete
        </button>
    );

    const renderAddresses = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr: IAddress.Item) => (
                <div key={addr.id} className="p-4 border rounded-md shadow-sm relative">
                    <h3 className="font-bold">{addr.detail}</h3>
                    <p>{addr.city}, {addr.postal_code}</p>
                    <div className="mt-4 flex gap-2">
                        {updateAddress(addr)}
                        {removeAddress(addr.id!)}
                    </div>
                </div>
            ))}
        </div>
    );

    const createAddress = () => (
        <Modal
            isOpen={isCreateOpen}
            setIsOpen={setIsCreateOpen}
            trigger={
                <Button
                    text="Create Address"
                    onClick={() => setIsCreateOpen(true)}
                    disabled={addresses.length >= 3}
                />
            }
            body={<Form title="Create Address" {...createConfig} />}
        />
    );

    return (
        <div className="p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Manage Addresses</h2>
            {renderAddresses()}
            {createAddress()}
        </div>
    );
}

export default Address;