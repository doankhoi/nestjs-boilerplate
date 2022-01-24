import { registerEnumType } from '@nestjs/graphql';

export enum ShareType {
  AUTO_APPROVE = 'AUTO_APPROVE',
  MANUAL_APPROVE = 'MANUAL_APPROVE',
}

registerEnumType(ShareType, {
  name: 'ShareType',
});
