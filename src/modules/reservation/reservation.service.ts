import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Booker } from './entities/booker.entity';
import { Guest } from './entities/guest.entity';
import { RoomRate } from './entities/room-rate.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservationService {

  private readonly logger = new Logger(ReservationService.name);

  constructor(
    private readonly http: HttpService,
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(Booker) private bookerRepo: Repository<Booker>,
    @InjectRepository(Guest) private guestRepo: Repository<Guest>,
    @InjectRepository(RoomRate) private rateRepo: Repository<RoomRate>,
  ) {}

  /**
   * Fetch reservation by booking ID → save to DB → return data
   */
  async fetchAndStoreReservation(bookingId: string) {
    this.logger.log(`🔎 Fetching reservation for Booking ID: ${bookingId}`);

    const url = `${process.env.NUITEE_API_URL}?bookingId=${bookingId}`;

    const response = await firstValueFrom(
      this.http.get(url, {
        headers: { 'x-api-key': process.env.NUITEE_API_KEY }
      })
    );

    const data = response.data.result;
    this.logger.log(`📥 API Response Received, Saving to DB...`);

    // Save main reservation
    const reservation = await this.reservationRepo.save({
      booking_id: bookingId,
      property_id: data.property_id,
      check_in: data.check_in,
      check_out: data.check_out,
      booking_date: data.booking_date,
      guest_name: data.guest_name,
      nuiteeReservationId: data.nuiteeReservationId,
      nuiteeReservationPin: data.nuiteeReservationPin,
      currency: data.currency,
      source_of_booking: data.source_of_booking,
      total_price: data.total_price,
      status: data.status,
      booker: await this.bookerRepo.save(data.booker),
      guest_details: await this.guestRepo.save(data.guest_details),
      room_rates: await this.rateRepo.save(data.room_rates),
    });

    this.logger.log(`✅ Reservation saved successfully with ID: ${reservation.id}`);
    return reservation;
  }
}
