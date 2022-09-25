import { Module } from '@nestjs/common';
import { MoviesService } from '../movies/service/movies.service';
import { MoviesController } from '../movies/controller/movies.controller';
import { Movie } from './entities/movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
