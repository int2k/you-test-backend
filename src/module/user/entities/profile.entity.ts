import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserEntity, UserSchema } from './user.entity';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class ProfileEntity {
  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: String, enum: ['cm', 'm'] })
  heightMeasurement: string;

  @Prop({ type: Number })
  weight: number;

  @Prop({ type: String, enum: ['kg'] })
  weightMeasurement: string;

  @Prop({ type: [String] })
  interests: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) // Ensure 'ref' is set to 'User'
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: UserSchema }) // Reference the UserSchema
  user: UserEntity; // This will be populated with the User object
}

export type ProfileDocument = ProfileEntity & Document;
export const ProfileSchema = SchemaFactory.createForClass(ProfileEntity);
