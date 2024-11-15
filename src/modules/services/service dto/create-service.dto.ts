import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServiceDto {
  Titre: string;
  Description: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value.replace(',', '.')))
  @IsNumber()
  Prix: number;

  @IsNotEmpty()
  @IsDateString()
  Date: string;
  Place: string;
  userId: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value.replace(',', '.')))
  @IsNumber()
  categorieId: number;
  image: string;
}
