import { Router } from "express";
import { LivroController } from "../controllers/LivroController";

const livroRoutes = Router();

livroRoutes.post("/", LivroController.create);
livroRoutes.get("/", LivroController.getAll);
livroRoutes.get("/:id", LivroController.getById);
livroRoutes.put("/:id", LivroController.update);
livroRoutes.delete("/:id", LivroController.delete);

export default livroRoutes;
