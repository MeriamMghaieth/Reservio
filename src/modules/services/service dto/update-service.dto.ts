export class UpdateServiceDto {
  Titre?: string;
  Description?: string;
  Prix?: number;
  Date?: Date;
  Image?: Express.Multer.File;
  Place?: string;
  userId?: number;
  categorieId?: number;
}
