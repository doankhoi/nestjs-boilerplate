import { CampaignMemberStatus } from '@common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'campaign-members' })
@ObjectType()
export class CampaignMember {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Expose()
  @Field()
  userId: string;

  @Column()
  @Expose()
  @Field()
  campaignId: string;

  @Column({
    type: 'enum',
    enum: CampaignMemberStatus,
    default: () => CampaignMemberStatus.PENDING,
  })
  @Expose()
  @Field(() => CampaignMemberStatus, {
    defaultValue: CampaignMemberStatus.PENDING,
  })
  status: CampaignMemberStatus = CampaignMemberStatus.PENDING;

  @Column({ type: 'bool', default: false })
  @Expose()
  @Field(() => Boolean, { defaultValue: false })
  isClaimed = false;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(member: Partial<CampaignMember>) {
    Object.assign(
      this,
      plainToClass(CampaignMember, member, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
