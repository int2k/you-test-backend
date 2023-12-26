import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // Import Schema type from Mongoose
import { UserEntity, UserSchema } from '../../user/entities/user.entity';

export type MessageDocument = MessageEntity & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class MessageEntity {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserEntity' })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: UserSchema }) // Reference the UserSchema
  user: UserEntity; // This will be populated with the User object

  @Prop()
  content: string;

  @Prop({ default: new Date() })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
