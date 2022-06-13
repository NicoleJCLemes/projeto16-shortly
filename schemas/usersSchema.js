import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export { signUpSchema, signInSchema }