import { registerEnumType } from '@nestjs/graphql';

export enum TemplateStatus {
  LISTED,
  UNLISTED,
}

registerEnumType(TemplateStatus, {
  name: 'TemplateStatus',
});
