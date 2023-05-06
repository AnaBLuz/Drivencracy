import { Router } from "express"
import { criarEnquete } from "../controllers/enquete.controllers.js"
import { mostrarEnquetes } from "../controllers/enquete.controllers.js"


const pollRouter = Router()

pollRouter.post("/poll",criarEnquete)
pollRouter.get("/poll",mostrarEnquetes)
pollRouter.get("/poll/:id/choice")
pollRouter.get("/poll/:id/result")

export default pollRouter