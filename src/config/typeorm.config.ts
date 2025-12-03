// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../modules/user/user.entity';
import { Profile } from '../modules/profile/profile.entity';
import { Post } from 'src/modules/post/post.entity';
import { Email } from 'src/modules/email/email.entity';
import { Booker } from 'src/modules/reservation/entities/booker.entity';
import { Guest } from 'src/modules/reservation/entities/guest.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { RoomRate } from 'src/modules/reservation/entities/room-rate.entity';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: configService.get<string>('DB_TYPE') as any,
  host: configService.get<string>('DB_HOST')!,
  port: parseInt(configService.get<string>('DB_PORT')!, 10),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  // Need to define all the Entities here , if any entity missed here then table will not create in Db
  entities: [User, Profile,Post,Email,RoomRate,Reservation,Guest,Booker],
  synchronize: true, // hardcoded for development
});
