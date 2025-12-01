import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Logger } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userId: number, dto: CreateProfileDto): Promise<Profile> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const profile = this.profileRepo.create({
      phone: dto.phone,
      address: dto.address,
      user,
    });

    return this.profileRepo.save(profile);
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!profile) {
      this.logger.warn(`Profile with ID ${id} not found`);
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  async remove(id: number): Promise<void> {
    const result = await this.profileRepo.delete(id);

    if (result.affected === 0) {
      this.logger.warn(`Profile with ID ${id} not found`);
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    this.logger.log(`Profile with ID ${id} deleted successfully`);
  }
}
