import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { LoginDto } from '../user/dto/login.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../../shared/pipes/validation/validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from '../user/dto/register.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  //
  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new ValidationPipe())
  // @Post('login')
  // login(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginDto, @Request() req) {
    // return req.user;
    return this.authService.passportLogin(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
