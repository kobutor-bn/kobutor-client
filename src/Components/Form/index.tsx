import { useForm, SubmitHandler, FieldValues, DefaultValues } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IForm } from "../../Services/typings/Form";

interface FormProps<T extends FieldValues> {
    fields: IForm.Item<T>[];
    schema: ZodSchema<T>;
    onSubmit: (values: T) => void;
}

const Form = <T extends FieldValues>({ fields, schema, onSubmit }: FormProps<T>) => {
    const generateDefaultValues = (): DefaultValues<T> => {
        return fields.reduce((acc, field) => {
            if (field.value !== undefined) {
                (acc as any)[field.name] = field.value;
            }
            return acc;
        }, {} as DefaultValues<T>);
    };

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: generateDefaultValues(),
    });

    const onSubmitHandler: SubmitHandler<T> = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Form</h2>
            {fields.map(field => (
                <div className="mb-4" key={field.name as string}>
                    <label htmlFor={field.name} className="block text-gray-700">{field.placeholder}</label>
                    <input
                        type={field.type}
                        {...register(field.name, {
                            setValueAs: field.type === 'number' ? (v) => v === '' ? undefined : parseFloat(v) : undefined,
                        })}
                        placeholder={field.placeholder}
                        className="w-full p-2 border border-gray-300 rounded"
                        defaultValue={field.value} // Ensure defaultValue is set here as well
                    />
                    {errors[field.name] && (
                        <p className="text-red-500 text-sm">
                            {(errors[field.name]?.message as string) || 'Invalid input'}
                        </p>
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>

            <button
                type="button"
                onClick={() => {
                    const values = getValues();
                    console.log(values);
                }}
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
            >
                Log Current Values
            </button>
        </form>
    );
};

export default Form;