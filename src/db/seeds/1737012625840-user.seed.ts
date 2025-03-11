import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '@/modules/user/entities/user.entity';
import { hashPassword } from '@/utils/helper';

export class UserSeed1737012625840 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    // Seed by Factory
    // const userFactory = factoryManager.get(User);
    // await userFactory.saveMany(5);

    // Seed by Repository
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        first_name: 'Admin',
        email: 'admin@admin.com',
        password: await hashPassword('password@123'),
        is_active: true,
      },
    ]);
  }
}
