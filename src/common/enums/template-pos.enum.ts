import { registerEnumType } from '@nestjs/graphql';

export enum TemplatePosition {
  TOP_LEFT,
  TOP_RIGHT,
  CENTER,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

registerEnumType(TemplatePosition, {
  name: 'TemplatePosition',
});
