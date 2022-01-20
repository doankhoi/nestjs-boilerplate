import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

@InputType()
export class SignupDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
