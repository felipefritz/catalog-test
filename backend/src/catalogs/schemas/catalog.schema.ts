import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ timestamps: true })
export class Catalog {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: [{ type: MongooseSchema.Types.Mixed }] })
  items: any[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);