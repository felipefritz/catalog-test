import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateCatalogDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsOptional()
  items?: any[];
}