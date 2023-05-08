import { Router } from "express"
import { criarEnquete } from "../controllers/enquete.controllers.js"
import { getEnquetes } from "../controllers/enquete.controllers.js"
import { getOpcoesVotos } from "../controllers/enquete.controllers.js"
import { resultado } from "../controllers/enquete.controllers.js"


const pollRouter = Router()

pollRouter.post("/poll",criarEnquete)
pollRouter.get("/poll",getEnquetes)
pollRouter.get("/poll/:id/choice",getOpcoesVotos)
pollRouter.get("/poll/:id/result", resultado)

export default pollRouter