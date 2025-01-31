import { Router } from "express";
import LeitorController from "../controllers/LeitorController";

const leitorRouter = Router();
const leitorController = new LeitorController();

leitorRouter.get("/", leitorController.getAll);
leitorRouter.get("/:id", leitorController.getOne);
leitorRouter.post("/", leitorController.create);
leitorRouter.delete("/:id", leitorController.delete);
leitorRouter.put("/:id", leitorController.update);

export default leitorRouter;
