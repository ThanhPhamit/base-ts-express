import { IsString, IsEmail, Length, Matches, IsNotEmpty, Validate, IsOptional } from 'class-validator';
import { RESPONSE_CODE } from '@/enums/response-code.enum';
import { IsEmailUnique } from '@/modules/user/decorations/user.decoration';

export class CreateUserDto {
  @IsOptional({ groups: ['update'] })
  @Length(1, 30, {
    message: RESPONSE_CODE.USER_FIRSTNAME_CHAR_LENGTH,
    groups: ['create', 'update'],
  })
  @IsString({
    message: RESPONSE_CODE.USER_FIRSTNAME_STRING,
    groups: ['create', 'update'],
  })
  @IsNotEmpty({
    message: RESPONSE_CODE.USER_FIRSTNAME_MISSING,
    groups: ['create'],
  })
  first_name?: string;

  @IsOptional({ groups: ['update'] })
  @Validate(IsEmailUnique, {
    message: RESPONSE_CODE.USER_EMAIL_EXISTED,
    groups: ['create', 'update'],
  })
  @IsEmail(
    {},
    {
      message: RESPONSE_CODE.USER_INVALID_EMAIL,
      groups: ['create', 'update'],
    },
  )
  @IsNotEmpty({ message: RESPONSE_CODE.USER_EMAIL_MISSING, groups: ['create'] })
  email?: string;

  @IsOptional({ groups: ['update'] })
  @Matches(/\d/, {
    message: RESPONSE_CODE.USER_PASSWORD_CONTAIN_NUMBER,
    groups: ['create', 'update'],
  })
  @Matches(/[A-Z]/, {
    message: RESPONSE_CODE.USER_PASSWORD_CONTAIN_UPPER_CHAR,
    groups: ['create', 'update'],
  })
  @Length(6, undefined, {
    message: RESPONSE_CODE.USER_PASSWORD_AT_LEAST_CHAR,
    groups: ['create', 'update'],
  })
  @IsNotEmpty({
    message: RESPONSE_CODE.AUTH_PASSWORD_MISSING,
    groups: ['create'],
  })
  password?: string;

  @IsOptional({ groups: ['create', 'update'] })
  is_active?: boolean;
}
