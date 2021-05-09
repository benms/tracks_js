import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
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
}
