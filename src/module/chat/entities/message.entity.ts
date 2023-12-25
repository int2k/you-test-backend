import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // Import Schema type from Mongoose
import { User, UserSchema } from '../../user/entities/user.entity';

export type MessageDocument = Message & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) // Ensure 'ref' is set to 'User'
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: UserSchema }) // Reference the UserSchema
  user: User; // This will be populated with the User object

  @Prop()
  content: string;

  @Prop({ default: new Date() })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
