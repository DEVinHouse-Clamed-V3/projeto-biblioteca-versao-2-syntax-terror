import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../database/data-source"
import Auditorio from "../entities/Auditorio"
import AppError from "../utils/AppError"
import { MoreThanOrEqual } from "typeorm"

class AuditorioController {

    private auditorioRepository

    constructor() {
        this.auditorioRepository = AppDataSource.getRepository(Auditorio)
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            if (!body.name) {
                throw new AppError('É obrigatório informar o nome', 400)
            } else if (!body.capacity) {
                throw new AppError('É obrigatório informar a capacidade', 400)
            } else if (!body.location) {
                throw new AppError('É obrigatório informar a localização', 400)
            } else {
                const auditorio = await this.auditorioRepository.save(body)

                res.status(201).json(auditorio)
            }
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const listAuditorios = await this.auditorioRepository.find()
            res.status(200).json(listAuditorios)
        } catch (error) {
            next(error)
        }
    }

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.params
            const auditoriumsInDatabase = await this.auditorioRepository.findOneBy({ id: +params.id })

            if (!auditoriumsInDatabase) {
                throw new AppError('produto não encontrado', 404)
            } else {
                res.json(auditoriumsInDatabase)
            }

        } catch (error) {
            next(error)
        }
    }
  
    getFilter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { capacity } = req.query

            let validCapacity = 300

            if (capacity !== undefined && capacity !== "") {
                validCapacity = Number(capacity);
                
                if (isNaN(validCapacity)) {
                    throw new AppError("A capacidade deve ser um número válido!", 400);
                }
    
                if (validCapacity < 300) {
                    throw new AppError("A capacidade mínima é 300!", 400);
                }
            }

            const whereConditions = {
                capacity: MoreThanOrEqual(validCapacity),
                has_projector: true,
                has_sound_system: true
            }
    
            const listAuditorios = await this.auditorioRepository.find({
                where: whereConditions
            });
    
            res.status(200).json(listAuditorios)
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.params
            const body = req.body

            if (body.id || body.created_at || body.updated_at) {
                throw new AppError('Existem informações que não podem ser atualizadas', 403)
            }

            const auditoriumsInDatabase = await this.auditorioRepository.findOneBy({ id: +params.id }) ?? new Auditorio()

            if (!auditoriumsInDatabase) {
                throw new AppError('Auditório não encontado!', 404)
            } else {
                Object.assign(auditoriumsInDatabase, body)
                await this.auditorioRepository.save(auditoriumsInDatabase)
                res.status(200).json(auditoriumsInDatabase)
            }

        } catch (error) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.params
            const auditoriumsInDatabase = await this.auditorioRepository.findOneBy({ id: +params.id })

            if (!auditoriumsInDatabase) {
                throw new AppError('Auditório não encontado!', 404)
            } else {
                const auditoriumName = auditoriumsInDatabase.name
                await this.auditorioRepository.delete(auditoriumsInDatabase.id)
                return res.status(200).json({message: `${auditoriumName} foi excluído com sucesso!`})
            }

        } catch (error) {
            next(error)
        }
    }

}

export default AuditorioController