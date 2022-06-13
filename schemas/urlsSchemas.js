import joi from "joi";

const shortUrlSchema = joi.object({
    url: joi.pattern(/^http:\/\/|https:\/\//)
});

export default shortUrlSchema