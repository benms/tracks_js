import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.y9sbb.mongodb.net/tracks_db?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
