import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  userId: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String })
  displayName: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: Number })
  height: number;
  @Prop({ type: Number })
  weight: number;

  @Prop({ type: [String] })
  interests: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
