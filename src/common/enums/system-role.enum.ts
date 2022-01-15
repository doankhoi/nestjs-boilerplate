import { registerEnumType } from '@nestjs/graphql';

export enum SystemRole {
  USER = 'user',
  ADMIN = 'admin',
}

registerEnumType(SystemRole, {
  name: 'SystemRole',
});
