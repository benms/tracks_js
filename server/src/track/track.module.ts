import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { trackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [trackService],
})
export class TrackModule {}
