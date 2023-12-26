import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatModule } from './module/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>('DATABASE_USER');
        const password = configService.get<string>('DATABASE_PASS');
        const dbHost = configService.get<string>('DATABASE_HOST');
        const dbPort = configService.get<string>('DATABASE_PORT');
        const dbName = configService.get<string>('DATABASE_NAME');
        return {
          uri: `mongodb://${username}:${password}@${dbHost}:${dbPort}`,
          dbName,
        };
      },
    }),
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'chat_queue',
        },
      },
    ]),
    UserModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
