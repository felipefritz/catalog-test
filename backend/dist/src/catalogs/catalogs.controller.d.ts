import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogsController {
    private readonly catalogsService;
    constructor(catalogsService: CatalogsService);
    create(createCatalogDto: CreateCatalogDto, req: any): Promise<import("./schemas/catalog.schema").Catalog>;
    findAll(): Promise<import("./schemas/catalog.schema").Catalog[]>;
    findOne(id: string): Promise<import("./schemas/catalog.schema").Catalog>;
    update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<import("./schemas/catalog.schema").Catalog>;
    remove(id: string): Promise<void>;
}
