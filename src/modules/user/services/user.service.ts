import { userRepository } from '@/modules/user/repositories/user.repository';
import { User } from '@/modules/user/entities/user.entity';
import { Like } from 'typeorm';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { validate } from 'class-validator';
import { DtoValidationException } from '@/config/http-exception';
import { hashPassword } from '@/utils/helper';

/**
 * Function to get a list of users based on search criteria and relations.
 */
export async function getListUser({ relations, search }: { relations?: Record<string, boolean>; search?: string }) {
  const conditions: Record<string, unknown>[] = [];
  if (search) {
    conditions.push({
      email: Like(`%${search}%`),
    });
  }

  return await userRepository.find({
    where: conditions,
    relations: relations,
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await userRepository.findOne({
    select: {
      id: true,
      email: true,
      password: true,
      is_active: true,
    },
    where: {
      email: email,
    },
  });
}

/**
 * Function to get a user by their ID.
 */
export async function getUserById(id: string, relations?: Record<string, boolean>): Promise<User | null> {
  return await userRepository.findOne({
    where: {
      id: id,
    },
    relations: relations,
  });
}

/**
 * Function to add a new user to the repository.
 */
export async function addNewUser(data: CreateUserDto) {
  const userDto = new CreateUserDto();

  // Validate the userDto object
  userDto.first_name = data.first_name;
  userDto.email = data.email;
  userDto.password = data.password;

  const errors = await validate(userDto, {
    groups: ['create'],
  });
  if (errors.length) {
    throw new DtoValidationException(errors);
  }

  userDto.password = await hashPassword(data.password as string);
  const user = userRepository.create(userDto);

  return await userRepository.save(user);
}
