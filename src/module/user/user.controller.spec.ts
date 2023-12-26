import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { Model } from 'mongoose';
import { mockUser } from './test-utils/mockUser';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let userModel: Model<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(UserEntity.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
