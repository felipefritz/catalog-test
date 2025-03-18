import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>,
  ) {}

  async create(createCatalogDto: CreateCatalogDto, userId: string): Promise<Catalog> {
    const newCatalog = new this.catalogModel({
      ...createCatalogDto,
      createdBy: userId,
    });
    return newCatalog.save();
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }

  async findOne(id: string): Promise<Catalog> {
    const catalog = await this.catalogModel.findById(id).exec();
    if (!catalog) {
      throw new NotFoundException(`Catálogo con ID ${id} no encontrado`);
    }
    return catalog;
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    const updatedCatalog = await this.catalogModel
      .findByIdAndUpdate(id, updateCatalogDto, { new: true })
      .exec();
    
    if (!updatedCatalog) {
      throw new NotFoundException(`Catálogo con ID ${id} no encontrado`);
    }
    
    return updatedCatalog;
  }

  async remove(id: string): Promise<void> {
    const result = await this.catalogModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Catálogo con ID ${id} no encontrado`);
    }
  }
}