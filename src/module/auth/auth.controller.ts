import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../../shared/pipes/validation/validation.pipe';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
