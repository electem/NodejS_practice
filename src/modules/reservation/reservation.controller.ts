import { Controller, Get, Param } from "@nestjs/common";
import { ReservationService } from "./reservation.service";

@Controller("reservation")
export class ReservationController {

  constructor(private readonly reservationService: ReservationService) {}

  /**
   * GET /reservation/:bookingId
   */
  @Get("/:bookingId")
  async getReservation(@Param("bookingId") bookingId: string) {
    return this.reservationService.fetchAndStoreReservation(bookingId);
  }
}
