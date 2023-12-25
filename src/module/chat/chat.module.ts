import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RabbitMqService } from './rabbit-mq.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [MessagesService, RabbitMqService],
  controllers: [ChatController],
})
export class ChatModule {}
