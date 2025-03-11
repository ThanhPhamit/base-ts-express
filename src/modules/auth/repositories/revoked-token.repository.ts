import { RevokedToken } from '@/modules/auth/entities/revoked-token.entity';
import { AppDataSource } from '@/config/database';

export const revokedTokenRepository = AppDataSource.getRepository(RevokedToken);
