import { SystemRole } from '@common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ type: 'text', length: 100, default: 'Anonymous' })
  @Expose()
  @Field({ nullable: true, defaultValue: 'Anonymous' })
  fullName?: string = 'Anonymous';

  @Column({ length: 200, unique: true })
  @Expose()
  @Field({ nullable: true })
  email?: string;

  @Column('text')
  @Expose()
  @Field({ nullable: true })
  bio?: string;

  @Column({ length: 500 })
  @Expose()
  @Field({ nullable: true })
  avatar?: string;

  @Column({ type: 'bool', default: () => false })
  @Expose()
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  isEmailVerified = false;

  @Column({ type: 'datetime', default: null, nullable: true })
  @Expose()
  @Field({ defaultValue: null, nullable: true })
  emailVerifiedAt: Date = null;

  @Column({ type: 'enum', enum: SystemRole, default: () => SystemRole.USER })
  @Expose()
  @Field(() => SystemRole, { defaultValue: SystemRole.USER })
  role: SystemRole;

  @Column({ length: 100, unique: true, nullable: false })
  @Expose()
  @Field()
  walletAddress: string;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(
      this,
      plainToClass(User, user, {
        excludeExtraneousValues: true,
      }),
    );

    this.role = this.role || SystemRole.USER;
    this.isEmailVerified = this.isEmailVerified || false;
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
