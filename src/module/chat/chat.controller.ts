// chat.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { RabbitMQService } from './rabbit-mq.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('messages')
  @ApiOperation({ summary: 'Get all chat messages' })
  @ApiResponse({ status: 200, description: 'Returns all chat messages.' })
  async getMessages() {
    return this.messagesService.getMessages();
  }

  @Post('messages')
  @ApiOperation({ summary: 'Create a new chat message' })
  @ApiResponse({ status: 201, description: 'Returns the created message.' })
  async createMessage(
    @Body() messageDto: { username: string; content: string },
  ) {
    const createdMessage = await this.messagesService.createMessage(
      messageDto.username,
      messageDto.content,
    );
    this.rabbitMQService.sendMessage(createdMessage);
    return createdMessage;
  }
}
