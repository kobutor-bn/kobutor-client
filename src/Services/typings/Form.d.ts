// Form.d.ts
import { ZodSchema } from "zod";
import { Path } from "react-hook-form";

declare namespace IForm {
    interface Item<T> {
        name: Path<T>;
        type: string;
        placeholder?: string;
        value?: any;
        required: boolean;
        validate?: (value: any) => boolean;
    }

    interface Config<T> {
        fields: Item<T>[];
        schema: ZodSchema<T>;
        onSubmit: (values: T) => void;
    }
}