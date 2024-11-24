import {DefaultValues, FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {ZodSchema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {IForm} from '../../Services/typings/Form';

interface FormProps<T extends FieldValues> {
    title: string;
    fields: IForm.Item<T>[];
    schema: ZodSchema<T>;
    onSubmit: (values: T) => void;
    defaultValues?: DefaultValues<T> | null; // Allow null as input
}

const Form = <T extends FieldValues>({
                                         fields,
                                         schema,
                                         onSubmit,
                                         title,
                                         defaultValues,
                                     }: FormProps<T>) => {
    // Preprocess `defaultValues`: Replace null or undefined with sensible defaults
    const sanitizedDefaults: DefaultValues<T> | undefined = defaultValues!
        ? (Object.fromEntries(
            Object.entries(defaultValues).map(([key, value]) => [key, value ?? '']) // Replace null/undefined with ''
        ) as DefaultValues<T>)
        : undefined;

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: sanitizedDefaults, // Use sanitized defaults
    });

    const onSubmitHandler: SubmitHandler<T> = (data) => {
        if (Object.keys(errors).length > 0) {
            console.error('Validation errors:', errors);
            return;
        }
        console.log('Form submitted with data:', data);
        onSubmit(data);
    };

    return (
        <div className="max-w-md w-full mx-auto flex flex-col justify-center items-center gap-5 p-6">
            <h2 className="font-bold text-3xl text-center">{title}</h2>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col w-full gap-5">
                {fields.map((field) => (
                    <div key={field.name as string} className={`flex gap-5`}>
                        <label htmlFor={field.name} className="hidden">
                            {field.placeholder}
                        </label>
                        <input
                            type={field.type}
                            {...register(field.name)}
                            placeholder={field.placeholder}
                            className="border-[1px] p-3 w-full"
                        />
                        {errors[field.name] && (
                            <p className="text-red-500 text-sm">
                                {(errors[field.name]?.message as string) || 'Invalid input'}
                            </p>
                        )}
                    </div>
                ))}
                <button
                    className="mt-4 w-full bg-black text-white py-2 rounded transition duration-200"
                    color="primary"
                    type="submit"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => console.log('Current values:', getValues())}
                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
                >
                    Log Current Values
                </button>
            </form>
        </div>
    );
};

export default Form;