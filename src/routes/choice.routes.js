import { Router } from "express"
import { criarVoto } from "../controllers/choices.controller.js"
import { votar } from "../controllers/choices.controller.js"



const choiceRouter = Router()

choiceRouter.post("/choice", criarVoto)
choiceRouter.post("/choice/:id/vote",votar)

export default choiceRouter