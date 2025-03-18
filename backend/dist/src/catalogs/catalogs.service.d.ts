import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogsService {
    private catalogModel;
    constructor(catalogModel: Model<CatalogDocument>);
    create(createCatalogDto: CreateCatalogDto, userId: string): Promise<Catalog>;
    findAll(): Promise<Catalog[]>;
    findOne(id: string): Promise<Catalog>;
    update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog>;
    remove(id: string): Promise<void>;
}
