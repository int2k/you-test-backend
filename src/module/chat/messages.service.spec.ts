// src/chat/messages.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesService } from './messages.service';
import {
  Message,
  MessageDocument,
  MessageSchema,
} from './entities/message.entity';
import { User, UserDocument, UserSchema } from '../user/entities/user.entity';
import { mockUser } from '../user/test-utils/mockUser';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageModel: Model<MessageDocument>;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            findOneUser: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageModel = module.get<Model<MessageDocument>>(
      getModelToken(Message.name),
    );
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  // describe('createMessage', () => {
  //   it('should create a new message', async () => {
  //     const messageDto = { username: 'user', content: 'New message' };
  //     const user = { _id: 'someUserId', username: messageDto.username }; // Mock user object with _id
  //     const createdMessage = { ...messageDto, timestamp: new Date(), user, userId: user._id } as unknown as Message;
  //
  //     jest.spyOn(userModel, 'findOne').mockResolvedValue(user as UserDocument);
  //     jest.spyOn(messageModel.prototype, 'save').mockResolvedValue(createdMessage);
  //
  //     expect(await service.createMessage(messageDto.username, messageDto.content)).toBe(createdMessage);
  //   });
  // });

  describe('getMessages', () => {
    it('should return an array of messages', async () => {
      const result = [{ content: 'Hello', timestamp: new Date() }] as Message[];
      jest.spyOn(messageModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(result),
      } as any);

      expect(await service.getMessages()).toEqual(result);
    });
  });
});
