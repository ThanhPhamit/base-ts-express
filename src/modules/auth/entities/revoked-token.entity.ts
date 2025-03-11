import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export const REVOKED_TOKEN_MODEL = 'revoked_tokens';

@Entity(REVOKED_TOKEN_MODEL)
export class RevokedToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  token: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  type: string;

  @Column({ type: 'timestamp', nullable: false })
  expires_at: Date;

  @CreateDateColumn()
  revoked_at: Date;
}
