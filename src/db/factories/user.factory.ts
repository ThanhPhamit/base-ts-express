import { setSeederFactory } from 'typeorm-extension';
import { User } from '@/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { hashPassword } from '@/utils/helper';

export const UsersFactory = setSeederFactory(User, async () => {
  const user = new User();
  user.first_name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = await hashPassword(faker.internet.password());
  user.is_active = true;
  return user;
});
