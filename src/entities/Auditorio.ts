import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity("auditorios")
export class Auditorio {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: false })
    name: string
    
    @Column({ type: "int", nullable: false })
    capacity: number

    @Column({ type: "varchar", nullable: false })
    location: string

    @Column({ type: "boolean", default: false})
    has_projector: boolean

    @Column({ type: "boolean", default: false })
    has_sound_system: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date
}

export default Auditorio