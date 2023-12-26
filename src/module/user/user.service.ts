import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(): Promise<UserEntity[]> {
    return this.userModel.find().exec();
  }

  findOneUser(query: string) {
    return this.userModel
      .findOne({ $or: [{ username: query }, { email: query }] })
      .exec();
  }

  findOneUserId(userId: string) {
    return this.userModel.findOne({ userId }).exec();
  }

  findOne(id: number) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
