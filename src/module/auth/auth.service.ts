import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<{ message: string }> {
    try {
      const { username, email, password } = dto;
      //
      const hash = await bcrypt.hash(password, 10);
      //
      // await this.userModel.create({ username, email, password: hash });
      const user = await this.userService.create({
        username,
        email,
        password: hash,
      });

      return { message: 'User registered' };
    } catch (e) {
      throw new Error('An error occurred while registering this user');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userService.findOneUser(username);
    if (!user) {
      throw new UnauthorizedException('User not found A');
    }
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

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneUser(username);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user?.password);
      if (passwordMatch) {
        const { password, ...result } = user.toJSON();
        return result;
      }
    }
    return null;
  }

  async passportLogin(user: UserEntity) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
