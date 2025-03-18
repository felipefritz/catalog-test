import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateCatalogDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsOptional()
  items?: any[];
}