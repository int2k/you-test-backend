import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<{ message: string }> {
    try {
      const { username, email, password } = dto;

      // const hash = await bcrypt.hash(password, 10);
      //
      // await this.userModel.create({ username, email, password: hash });

      return { message: 'User registered' };
    } catch (e) {
      throw new Error('An error occurred while registering this user');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userService.findOneUser(username);

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch || !user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { userId: user._id, username };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
