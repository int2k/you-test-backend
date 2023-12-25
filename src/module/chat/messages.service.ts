// messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createMessage(username: string, content: string): Promise<Message> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const createdMessage = new this.messageModel({
      content,
      userId: user._id,
      user,
    });
    return createdMessage.save();
  }

  async getMessages(): Promise<Message[]> {
    return this.messageModel.find().populate('user').exec();
  }
}
