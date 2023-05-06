import joi from "joi"

export const enqueteSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string()
})