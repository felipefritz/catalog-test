import { Document, Schema as MongooseSchema } from 'mongoose';
export type CatalogDocument = Catalog & Document;
export declare class Catalog {
    nombre: string;
    descripcion: string;
    items: any[];
    createdBy: MongooseSchema.Types.ObjectId;
}
export declare const CatalogSchema: MongooseSchema<Catalog, import("mongoose").Model<Catalog, any, any, any, Document<unknown, any, Catalog> & Catalog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Catalog, Document<unknown, {}, import("mongoose").FlatRecord<Catalog>> & import("mongoose").FlatRecord<Catalog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
