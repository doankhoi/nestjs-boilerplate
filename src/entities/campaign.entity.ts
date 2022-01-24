import { CampaignStatus, PaymentStatus, TemplatePosition } from '@common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'campaigns' })
@ObjectType()
export class Campaign {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ length: 500 })
  @Expose()
  @Field()
  name: string;

  @Column({ type: 'text' })
  @Expose()
  @Field()
  description: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  logo?: string;

  @Column({
    type: 'enum',
    enum: TemplatePosition,
    default: () => TemplatePosition.CENTER,
  })
  @Expose()
  @Field(() => TemplatePosition, { defaultValue: TemplatePosition.CENTER })
  templatePosition: TemplatePosition = TemplatePosition.CENTER;

  @Column()
  @Expose()
  @Field()
  templateId: string;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: () => CampaignStatus.LISTED,
  })
  @Expose()
  @Field(() => CampaignStatus, { defaultValue: CampaignStatus.LISTED })
  status: CampaignStatus = CampaignStatus.LISTED;

  @Column({ default: () => 0 })
  @Expose()
  @Field(() => Number, { defaultValue: 0 })
  numberItem = 0;

  @Column({ default: () => 0 })
  @Expose()
  @Field(() => Number, { defaultValue: 0 })
  amountOnItem = 0;

  @Column()
  @Expose()
  @Field()
  currency: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: () => PaymentStatus.SUCCESS,
  })
  @Expose()
  @Field(() => PaymentStatus, { defaultValue: PaymentStatus.SUCCESS })
  paymentStatus: PaymentStatus = PaymentStatus.SUCCESS;

  @Column()
  @Expose()
  @Field({ nullable: true })
  paymentWallet?: string;

  @Column()
  @Expose()
  @Field()
  creatorId: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  endTime?: Date;

  @Column()
  @Expose()
  @Field({ nullable: true })
  mergeImageUrl?: string;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(campaign: Partial<Campaign>) {
    Object.assign(
      this,
      plainToClass(Campaign, campaign, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
