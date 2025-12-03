import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { Booker } from './entities/booker.entity';
import { Guest } from './entities/guest.entity';
import { RoomRate } from './entities/room-rate.entity';

@Module({
  imports: [
    HttpModule, // For external API calls
    TypeOrmModule.forFeature([Reservation, Booker, Guest, RoomRate]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
