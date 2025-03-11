import { AppDataSource } from '@/config/database';
import { User } from '@/modules/user/entities/user.entity';

export const userRepository = AppDataSource.getRepository(User);
