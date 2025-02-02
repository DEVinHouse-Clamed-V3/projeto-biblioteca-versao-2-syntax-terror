import { AppDataSource } from "./database/data-source";
import { Livro } from "./entities/Livro";

const testCRUD = async () => {
    await AppDataSource.initialize();

    const bookRepository = AppDataSource.getRepository(Livro);

    // Criando um novo livro
    const newBook = bookRepository.create({
        title: "Clean Code",
        description: "Um livro sobre boas práticas de programação",
        publication_date: new Date("2008-08-01"),
        isbn: "9780132350884",
        page_count: 464,
        language: "English",
    });

    await bookRepository.save(newBook);
    console.log("Livro salvo:", newBook);

    // Buscando todos os livros
    const books = await bookRepository.find();
    console.log("Livros cadastrados:", books);

    // Fechando conexão
    await AppDataSource.destroy();
};

testCRUD().catch(console.error);
