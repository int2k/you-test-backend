// messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageEntity, MessageDocument } from './entities/message.entity';
import { UserEntity, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(MessageEntity.name) private messageModel: Model<MessageDocument>,
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
  ) {}

  async createMessage(username: string, content: string): Promise<MessageEntity> {
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

  async getMessages(): Promise<MessageEntity[]> {
    return this.messageModel.find().populate('user').exec();
  }
}
