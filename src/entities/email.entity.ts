import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { uuidv4 } from '@utils';
import { Expose, plainToClass } from 'class-transformer';
import { EmailType } from '@common';
import { ObjectType, ID, Field } from '@nestjs/graphql';

@Entity({
  name: 'emails',
  orderBy: {
    createdAt: 'ASC',
  },
})
@ObjectType()
export class Email {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  userId: string;

  @Expose()
  @Column()
  type: EmailType;

  @Expose()
  @Column({ type: 'bool', default: false })
  @Field({ nullable: true, defaultValue: false })
  isOpened?: boolean = false;

  @Expose()
  @Column()
  @Field()
  createdAt: number;

  @Expose()
  @Column()
  @Field()
  updatedAt: number;

  constructor(email: Partial<Email>) {
    if (email) {
      Object.assign(
        this,
        plainToClass(Email, email, {
          excludeExtraneousValues: true,
        }),
      );
      this._id = this._id || uuidv4();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
