import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  // Note: userId will be set in the controller, not required from the client
  userId?: number;
}
