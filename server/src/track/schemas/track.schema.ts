import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Expose } from 'class-transformer';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
/* TrackSchema.virtual('picture-url').get(function () {
  console.log(process.env.HOST_URL + '/' + this.picture);
  return process.env.HOST_URL + '/' + this.picture;
});
TrackSchema.virtual('audio-url').get(function () {
  console.log(process.env.HOST_URL + '/' + this.audio);
  return process.env.HOST_URL + '/' + this.audio;
}); */
