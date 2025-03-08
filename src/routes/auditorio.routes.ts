import { Router } from 'express'
import AuditorioController from '../controllers/AuditorioController';


const auditorioRoutes = Router();
const auditorioController = new AuditorioController()

auditorioRoutes.post("/", auditorioController.create)
auditorioRoutes.get("/", auditorioController.getAll)
auditorioRoutes.get("/filter", auditorioController.getFilter)
auditorioRoutes.get("/:id", auditorioController.getOne)
auditorioRoutes.put("/:id", auditorioController.update)
auditorioRoutes.delete("/:id", auditorioController.delete)

export default auditorioRoutes;