import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  breed: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
