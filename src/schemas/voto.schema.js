import joi from "joi"

export const opcaoVotoSchema = joi.object({
    title: joi.string().required(),
    pollId: joi.string().required()
})
