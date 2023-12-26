import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RabbitMQService } from './rabbit-mq.service';
import { ChatController } from './chat.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageEntity, MessageSchema } from './entities/message.entity';
import { UserEntity, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: MessageEntity.name, schema: MessageSchema },
      { name: UserEntity.name, schema: UserSchema },
    ]),
  ],
  providers: [MessagesService, RabbitMQService],
  controllers: [ChatController],
  exports: [MessagesService, RabbitMQService],
})
export class ChatModule {}
