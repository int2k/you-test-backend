// src/chat/chat.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { RabbitMQService } from './rabbit-mq.service';

describe('ChatController', () => {
  let controller: ChatController;
  let messagesService: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        MessagesService,
        RabbitMQService,
        {
          provide: getModelToken(Message.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    messagesService = module.get<MessagesService>(MessagesService);
  });

  describe('getMessages', () => {
    it('should return an array of messages', async () => {
      const result = [{ content: 'Hello', timestamp: new Date() }] as Message[]; // Ensure the correct structure
      jest.spyOn(messagesService, 'getMessages').mockResolvedValue(result);

      expect(await controller.getMessages()).toEqual(result); // Use toEqual for array/object comparisons
    });
  });

  describe('createMessage', () => {
    it('should create a new message', async () => {
      const messageDto = { username: 'user', content: 'New message' };
      const createdMessage = {
        ...messageDto,
        timestamp: new Date(),
      } as unknown as Message; // Ensure the correct structure
      jest
        .spyOn(messagesService, 'createMessage')
        .mockResolvedValue(createdMessage);

      expect(await controller.createMessage(messageDto)).toBe(createdMessage);
    });
  });
});
