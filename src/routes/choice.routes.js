
import { Router } from "express"


const choiceRouter = Router()

choiceRouter.post("/choice")
choiceRouter.post("/choice/:id/vote")

export default choiceRouter