import { TemplateStatus } from '@common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'templates' })
@ObjectType()
export class Template {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ length: 500 })
  @Expose()
  @Field()
  name: string;

  @Column()
  @Expose()
  @Field()
  url: string;

  @Column({ type: 'text' })
  @Expose()
  @Field({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TemplateStatus,
    default: () => TemplateStatus.LISTED,
  })
  @Expose()
  @Field(() => TemplateStatus, { defaultValue: TemplateStatus.LISTED })
  status: TemplateStatus = TemplateStatus.LISTED;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(template: Partial<Template>) {
    Object.assign(
      this,
      plainToClass(Template, template, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
