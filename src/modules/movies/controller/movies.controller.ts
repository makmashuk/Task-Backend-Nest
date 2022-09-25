import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../modules/auth/gaurds/auth.gaurd.jwt';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MoviesService } from '../service/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMovieDto: CreateMovieDto, @Request() req) {
    try {
      return this.moviesService.create(createMovieDto, req.user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    try {
      return this.moviesService.findAll(req.user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    try {
      return this.moviesService.findOne(+id, req.user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Request() req,
  ) {
    try {
      return this.moviesService.update(+id, updateMovieDto, req.user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    try {
      return this.moviesService.remove(+id, req.user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
