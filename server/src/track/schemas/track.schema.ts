import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TrackDocument = Track & Document;

@Schema({ toObject: { virtuals: true }, toJSON: { virtuals: true } })
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
TrackSchema.virtual('picture_url').get(function () {
  return process.env.HOST_URL + '/' + this.picture;
});
TrackSchema.virtual('audio_url').get(function () {
  return process.env.HOST_URL + '/' + this.audio;
});
