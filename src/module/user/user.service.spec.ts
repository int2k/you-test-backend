import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { getModelToken } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import { mockUser } from './test-utils/mockUser';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getModelToken(UserEntity.name),
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

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
