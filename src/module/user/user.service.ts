import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { ProfileEntity } from './entities/profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    @InjectModel(ProfileEntity.name) private profileModel: Model<ProfileEntity>,
  ) {}

  create(dto: RegisterDto): Promise<UserEntity> {
    const createdUser = new this.userModel(dto);
    return createdUser.save();
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

  async createProfile(userId: string, dto: CreateUserDto) {
    const user = await this.userModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    const profile = new this.profileModel(dto);

    user.profile = profile;

    await user.save();

    return profile;
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findOne({ userId }).populate('profile');

    if (!user) {
      throw new NotFoundException();
    }

    return user.profile;
  }

  async updateProfile(userId, dto: UpdateUserDto) {
    const user = await this.userModel
      .findOne({ userId })
      .populate('profile')
      .exec();
    if (!user) {
      throw new NotFoundException();
    }
    if (!user.profile) {
      throw new NotFoundException();
    }

    const profile = user.profile;
    profile.name = dto.name;
    profile.gender = dto.gender;
    profile.birthday = new Date(dto.birthday);
    profile.height = dto.height;
    profile.weight = dto.weight;
    profile.interests = dto.interests;

    user.profile = profile;

    user.save();

    return user.profile;
  }
}
