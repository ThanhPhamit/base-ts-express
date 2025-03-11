/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { userRepository } from '@/modules/user/repositories/user.repository';
import { RESPONSE_CODE } from '@/enums/response-code.enum';

@ValidatorConstraint({ async: true })
export class IsEmailUnique implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const user = await userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    return !user;
  }

  defaultMessage(_args: ValidationArguments): string {
    return RESPONSE_CODE.USER_EMAIL_EXISTED;
  }
}
