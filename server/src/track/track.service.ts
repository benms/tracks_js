import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    return await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
  }

  async getAll(count = 10, offset = 0, search: string): Promise<Track[]> {
    const query =
      search && search.length
        ? { name: { $regex: new RegExp(search, 'i') } }
        : {};

    return await this.trackModel
      .find(query, { __v: false })
      .skip(Number(offset))
      .limit(Number(count));
  }

  async getOne(trackId: ObjectId): Promise<Track> {
    return await this.trackModel
      .findById(trackId, { __v: false })
      .populate('comments');
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

  async listen(trackId: ObjectId) {
    const track = await this.trackModel.findById(trackId);
    track.listens += 1;
    track.save();
  }
}
