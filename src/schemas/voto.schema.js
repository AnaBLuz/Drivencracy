import joi from "joi"

export const opcaoVoto = joi.object({
    title: joi.string().required()
})
