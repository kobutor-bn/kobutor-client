import {z} from "zod";
import {IForm} from "../../Services/typings/Form";
import {addrSchema, createAddrSchema, loginSchema, reviewSchema, userInfoSchema, userSettingsSchema} from "./schema.ts";

const reviewFormConfig: IForm.Config<z.infer<typeof reviewSchema>> = {
    fields: [
        {name: 'title', type: 'text', placeholder: 'Review Title', required: true},
        {name: 'rating', type: 'number', placeholder: 'Rating (1-5)', required: true},
        {name: 'desc', type: 'text', placeholder: 'Describe your experience', required: true},
    ],
    schema: reviewSchema,
    onSubmit: (values) => console.log('Submitting review:', values),
};

const userSettingsFormConfig: IForm.Config<z.infer<typeof userSettingsSchema>> = {
    fields: [
        {name: 'id', type: 'hidden', required: true},
        {name: 'name', type: 'text', placeholder: 'Enter your Full Name', required: true},
        {name: 'username', type: 'text', placeholder: 'Enter your username', required: true},
        {name: 'password', type: 'password', placeholder: 'Enter your password', required: false},
        {name: 'new_password', type: 'password', placeholder: 'Confirm your new password', required: false},
        {name: 'phone', type: 'number', placeholder: 'Enter your phone number', required: true},
        {name: 'avatar', type: 'text', placeholder: 'Enter avatar URL', required: false},
    ],
    schema: userSettingsSchema,
    onSubmit: (values) => console.log('Registering user:', values),
};

const userInfoFormConfig: IForm.Config<z.infer<typeof userInfoSchema>> = {
    fields: [
        {name: "email", type: "text", placeholder: "Enter Email", required: true},
        {name: "phone", type: "text", placeholder: "Enter Phone Number", required: true},
    ],
    schema: userInfoSchema,
    onSubmit: (values) => console.log('Registering user:', values),
};

const addrFormConfig: IForm.Config<z.infer<typeof addrSchema>> = {
    fields: [
        {name: "detail", type: "text", placeholder: "Enter Street Address", required: true},
        {name: "city", type: "text", placeholder: "Enter City", required: true},
        {name: "postal_code", type: "text", placeholder: "Enter ZIP/Postal Code", required: true},
    ],
    schema: addrSchema,
    onSubmit: (values) => console.log("Address Submitted:", values),
};

const createAddrFormConfig: IForm.Config<z.infer<typeof createAddrSchema>> = {
    fields: [
        {name: "detail", type: "text", placeholder: "Enter Street Address", required: true},
        {name: "city", type: "text", placeholder: "Enter City", required: true},
        {name: "postal_code", type: "text", placeholder: "Enter ZIP/Postal Code", required: true},
    ],
    schema: createAddrSchema,
    onSubmit: (values) => console.log("Address Submitted:", values),
};

const loginFormConfig: IForm.Config<z.infer<typeof loginSchema>> = {
    fields: [
        {name: 'email', type: 'email', placeholder: 'Enter your email', required: true},
        {name: 'password', type: 'password', placeholder: 'Enter your password', required: true},
    ],
    schema: loginSchema,
    onSubmit: (values) => console.log('Logging in:', values),
};

export {
    reviewFormConfig,
    userSettingsFormConfig,
    userInfoFormConfig,
    loginFormConfig,
    addrFormConfig,
    createAddrFormConfig
};