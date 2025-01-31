import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Leitor from "../entities/Leitor";
import AppError from "../utils/AppError";
import handleError from "../middlewares/handleError";

class LeitorController {
  private repository;

  constructor() {
    this.repository = AppDataSource.getRepository(Leitor);
  }

  create = async (req: Request, res: Response) => {
    try {
      const leitor = this.repository.create(req.body);
      await this.repository.save(leitor);
      res.status(201).json(leitor);
    } catch (error) {
      handleError(error, res);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const { nome } = req.query;
      const leitores = nome
        ? await this.repository.find({ where: { nome: nome.toString() } })
        : await this.repository.find();
      res.json(leitores);
    } catch (error) {
      handleError(error, res);
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const leitor = await this.repository.findOneBy({ id: Number(id) });
      if (!leitor) throw new AppError("Leitor não encontrado", 404);
      res.json(leitor);
    } catch (error) {
      handleError(error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let leitor = await this.repository.findOneBy({ id: Number(id) });
      if (!leitor) throw new AppError("Leitor não encontrado", 404);
      leitor = { ...leitor, ...req.body };
      await this.repository.save(Leitor);
      res.json(leitor);
    } catch (error) {
      handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const leitor = await this.repository.findOneBy({ id: Number(id) });
      if (!leitor) throw new AppError("Leitor não encontrado", 404);
      await this.repository.remove(leitor);
      res.status(204).send();
    } catch (error) {
      handleError(error, res);
    }
  };

  getAniversariantes = async (req: Request, res: Response) => {
    try {
      const mesAtual = new Date().getMonth() + 1;
      const leitores = await this.repository.createQueryBuilder("leitor")
        .where("EXTRACT(MONTH FROM leitor.data_nascimento) = :mes", { mes: mesAtual })
        .getMany();
      res.json(leitores);
    } catch (error) {
      handleError(error, res);
    }
  };
}

export default LeitorController;
