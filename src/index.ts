require('dotenv').config()
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import livroRoutes from "./routes/livro.routes";
import auditorioRoutes from "./routes/auditorio.routes";
import autorRoutes from "./routes/autor.routes";
import leitorRoutes from "./routes/leitor.routes";
import { handleError } from "./middlewares/handleError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(handleError);

AppDataSource.initialize()
  .then(() => {
    console.log("Sua conexão com banco de dados está ok");

    const port = process.env.PORT || 3333
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(() => console.log("Erro ao conectar com o banco de dados"));


app.use("/livros", livroRoutes);
app.use("/auditorios", auditorioRoutes);
app.use("/autores", autorRoutes);
app.use("/leitores", leitorRoutes);
