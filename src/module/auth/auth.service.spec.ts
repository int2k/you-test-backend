import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserEntity } from '../user/entities/user.entity';
import { mockUser } from '../user/test-utils/mockUser';
import { ProfileEntity } from '../user/entities/profile.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '1d' },
          }),
        }),
      ],
      providers: [
        AuthService,
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
        {
          provide: getModelToken(ProfileEntity.name),
          useValue: {
            // new: jest.fn().mockResolvedValue(mockUser),
            // constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            findOneUser: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
