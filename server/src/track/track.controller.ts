import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture, audio);
  }

  @Get()
  getAll(
    @Query('count') count: number,
    @Query('offset') offset: number,
    @Query('search') search: string,
  ) {
    return this.trackService.getAll(count, offset, search);
  }

  @Get(':id')
  getOne(@Param('id') trackId: ObjectId) {
    return this.trackService.getOne(trackId);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') trackId: ObjectId) {
    return this.trackService.delete(trackId);
  }

  @Post(':id/comments')
  @HttpCode(201)
  createComment(
    @Param('id') trackId: ObjectId,
    @Body() dto: CreateCommentRequestDto,
  ) {
    return this.trackService.addComment({ ...dto, trackId });
  }

  @Post(':id/listen')
  listen(@Param('id') trackId: ObjectId) {
    this.trackService.listen(trackId);
    return this.trackService.getOne(trackId);
  }
}
