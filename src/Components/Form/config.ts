import { z } from 'zod';
import {IForm} from "../../Services/typings/Form";
import {loginSchema, reviewSchema} from "./schema.ts";


const reviewFormConfig: IForm.Config<z.infer<typeof reviewSchema>> = {
    fields: [
        { name: 'title', type: 'text', placeholder: 'Review Title', required: true },
        { name: 'rating', type: 'number', placeholder: 'Rating (1-5)', required: true },
        { name: 'desc', type: 'text', placeholder: 'Describe your experience', required: true },
    ],
    schema: reviewSchema,
    onSubmit: (values) => console.log('Submitting review:', values),
};

const loginFormConfig: IForm.Config<z.infer<typeof loginSchema>> = {
    fields: [
        { name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
        { name: 'password', type: 'password', placeholder: 'Enter your password', required: true },
    ],
    schema: loginSchema,
    onSubmit: (values) => console.log('Logging in:', values),
};


export { reviewFormConfig, loginFormConfig };