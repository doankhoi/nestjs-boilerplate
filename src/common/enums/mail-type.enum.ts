import { registerEnumType } from '@nestjs/graphql';

export enum EmailType {
  VERIFY_EMAIL,
  FORGOT_PASSWORD,
}

registerEnumType(EmailType, {
  name: 'EmailType',
});
