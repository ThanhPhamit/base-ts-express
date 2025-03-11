import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export const USER_MODEL = 'users';

@Entity(USER_MODEL)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 50, nullable: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
