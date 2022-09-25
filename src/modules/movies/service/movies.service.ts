import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}
  async create(createMovieDto: CreateMovieDto, user: User) {
    const isExist = await this.isMovieExist(createMovieDto.title, user.id);
    if (isExist) {
      throw new BadRequestException('Movie Already exist');
    }
    const payload = {
      ...createMovieDto,
      user: user,
    };
    const newMovie = await this.movieRepository.create(payload).save();
    return newMovie;
  }
  async findAll(user: User) {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.userId = :userId', {
        userId: user.id,
      })
      .getManyAndCount();
  }
  async findOne(id: any, user: User) {
    const movie = await this.findOneById(id, user.id);
    if (movie) {
      return movie;
    }
    throw new NotFoundException('Movies Not Found');
  }
  async update(id: any, updateMovieDto: UpdateMovieDto, user: User) {
    const isMovieExist = await this.findOneById(id, user.id);
    if (isMovieExist) {
      const updatedMovie = await this.movieRepository.update(
        id,
        updateMovieDto,
      );
      return updatedMovie;
    }
    throw new NotFoundException('Movies Not Found');
  }
  async remove(id: number, user: User) {
    const deletedTodo = await this.movieRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new NotFoundException('Movies Not Found');
    }
  }

  async isMovieExist(title: string, userId: number) {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title = :title And movie.userId = :userId', {
        title,
        userId,
      })
      .getOne();
  }
  async findOneById(id: number, userId: number) {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id And movie.userId = :userId', {
        id,
        userId,
      })
      .getOne();
  }
}
