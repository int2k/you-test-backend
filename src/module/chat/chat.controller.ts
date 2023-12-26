// chat.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiHeader,
  ApiHeaders,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { RabbitMQService } from './rabbit-mq.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('chat')
@UseGuards(JwtAuthGuard)
@ApiHeader({ name: 'x-access-token', description: 'Authentication token' })
@Controller('api')
export class ChatController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('viewMessages')
  @ApiOperation({ summary: 'Get all chat messages' })
  @ApiResponse({ status: 200, description: 'Returns all chat messages.' })
  async getMessages() {
    return this.messagesService.getMessages();
  }

  @Post('sendMessage')
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
