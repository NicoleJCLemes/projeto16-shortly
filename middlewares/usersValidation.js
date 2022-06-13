import { signUpSchema, signInSchema } from "../schemas/usersSchema.js";

export function signUpValidation (req, res, next) {
    const user = req.body;
    const validation = signUpSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message)
        })
    }

    next();
}

export function signInValidation (req, res, next) {
    const user = req.body;
    const validation = signInSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message)
        })
    }

    next();
}