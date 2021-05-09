import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    return await this.trackModel.create({ ...dto, listens: 0 });
  }

  async getAll(): Promise<Track[]> {
    return await this.trackModel.find({});
  }

  async getOne(trackId: ObjectId): Promise<Track> {
    return await this.trackModel.findById(trackId).populate('comments');
  }

  async delete(trackId: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(trackId);

    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();

    return comment;
  }
}
