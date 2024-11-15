import { IsInt, IsNotEmpty, IsDate } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @IsNotEmpty()
  DATE: Date;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;
}
