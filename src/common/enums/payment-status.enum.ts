import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatus {
  SUCCESS,
  FAILED,
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});
