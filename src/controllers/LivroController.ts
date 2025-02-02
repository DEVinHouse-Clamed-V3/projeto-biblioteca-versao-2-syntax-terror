import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { Livro } from "../entities/Livro";
import AppError from "../utils/AppError";

const livroRepository = AppDataSource.getRepository(Livro);

export class LivroController {
  // Cria um livro
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, publication_date, isbn, page_count, language } = req.body;

    // Verifica se o título já existe no banco de dados
    const existingBook = await livroRepository.findOneBy({ title });

    if (existingBook) {
      throw new AppError("Já existe um livro com esse título.", 400);
    }
     
      if (!title || !isbn) {
        throw new AppError("Título e ISBN são obrigatórios", 400);
      }

      const newLivro = livroRepository.create({
        title,
        description,
        publication_date,
        isbn,
        page_count,
        language,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await livroRepository.save(newLivro);
      return res.status(201).json(newLivro);
    } catch (error) {
      next(error);
    }
  }

  // Lista todos os livros
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const livros = await livroRepository.find();
      return res.status(200).json(livros);
    } catch (error) {
      next(error);
    }
  }

  // Busca um livro pelo ID
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log("O ID é: "+id)
      const livro = await livroRepository.findOneBy({ id: Number(id) });

      if (!livro) {
        throw new AppError("Livro não encontrado", 404);
      }

      return res.status(200).json(livro);
    } catch (error) {
      next(error);
    }
  }

  // Atualiza um livro pelo ID
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, publication_date, isbn, page_count, language } = req.body;

      const livro = await livroRepository.findOneBy({ id: Number(id) });

      if (!livro) {
        throw new AppError("Livro não encontrado", 404);
      }

      livro.title = title || livro.title;
      livro.description = description || livro.description;
      livro.publication_date = publication_date || livro.publication_date;
      livro.isbn = isbn || livro.isbn;
      livro.page_count = page_count || livro.page_count;
      livro.language = language || livro.language;
      livro.updated_at = new Date();

      await livroRepository.save(livro);
      return res.status(200).json(livro);
    } catch (error) {
      next(error);
    }
  }

  // Deleta um livro pelo ID
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const livro = await livroRepository.findOneBy({ id: Number(id) });

      if (!livro) {
        throw new AppError("Livro não encontrado", 404);
      }

      await livroRepository.remove(livro);
      return res.status(202).json({
        message: "O livro foi deletado com sucesso",
      }); // Sem conteúdo
    } catch (error) {
      next(error);
    }
  }

  // Retornar 3 livros com mais páginas cadastrados categorizadas por língua.
  static async getRanking(req: Request, res: Response, next: NextFunction) {
    try {
      let { language } = req.query;
  
      // Verifica se o idioma foi fornecido
      if (!language) {
        throw new AppError("Idioma é obrigatório", 400);
      }
  
      // Garante que o idioma seja uma string, mesmo que venha como array ou algo mais complexo
      if (Array.isArray(language)) {
        language = language[0]; // Se for um array, pega o primeiro valor
      }
  
      if (typeof language !== 'string') {
        throw new AppError("O idioma deve ser uma string", 400);
      }
  
      // Busca todos os livros do idioma fornecido
      const livros = await livroRepository.find({ where: { language: language as string } });
  
      // Se não encontrar livros, retorna um erro
      if (livros.length === 0) {
        throw new AppError("Nenhum livro encontrado para o idioma especificado", 404);
      }
  
      // Ordena os livros pela quantidade de páginas de forma decrescente
      const livrosOrdenados = livros.sort((a, b) => b.page_count - a.page_count);
  
      // Retorna os 3 primeiros livros
      const topLivros = livrosOrdenados.slice(0, 3);
  
      return res.status(200).json(topLivros);
    } catch (error) {
      next(error);
    }
  }
  
  
  

}
