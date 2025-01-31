import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("leitores")
export class Leitor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    nome: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar" })
    telefone: string;

    @Column({ type: "date" })
    data_nascimento: Date;

    @Column({ type: "text" })
    endereco: string;

    @Column({ type: "boolean", default: true })
    ativo: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
