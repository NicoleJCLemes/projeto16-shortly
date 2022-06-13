import shortUrlSchema from "../schemas/urlsSchemas.js"

export function postShortUrlValidation (req, res, next) {
    const url = req.body;
    const validation = shortUrlSchema.validate(url);

    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message)
        })
    }

    next();
}