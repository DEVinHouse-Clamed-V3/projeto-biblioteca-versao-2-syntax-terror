import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const autenticarRota = (req: Request, res: Response, next: NextFunction) => {
    const senhaCorreta = process.env.SENHA_ACESSO || "123";

    if (!req.headers.senha) {
        return res.status(401).json({ erro: "Cabeçalho de autenticação ausente" }).end();
    }

    if (req.headers.senha === senhaCorreta) {
        next();
    } else {
        return res.status(401).json({ erro: "Você não tem permissão" }).end();
    }
};

export default autenticarRota;
