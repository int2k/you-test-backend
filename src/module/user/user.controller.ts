import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  Put, Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@Controller('api')
@ApiHeader({ name: 'x-access-token', description: 'Authentication token' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('user')
  @UseInterceptors(ClassSerializerInterceptor)
  profile(@Req() req) {
    return req.user;
  }

  @Post('createProfile')
  createProfile(@Body() dto: CreateUserDto, @Req() req) {
    const user = req.user;
    return this.userService.createProfile(user.userId, dto);
  }

  @Get('getProfile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @Put('updateProfile')
  updateProfile(@Body() dto: UpdateUserDto, @Req() req) {
    return this.userService.updateProfile(req.user.userId, dto);
    // const profile = await this.profileService.findByUser(req.user);
    // return this.profileService.update(profile.id, dto);
  }
}
