import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.movieService.getAll();
    }

    @Get('/search')
    search(@Query('year') movieData: string) {
        return `searching for a movie made after: ${movieData}`
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie {
        return this.movieService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.movieService.create(movieData);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() movieDate) {
        return this.movieService.patch(movieId, movieDate);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number) {
        return this.movieService.remove(movieId);
    }
}
