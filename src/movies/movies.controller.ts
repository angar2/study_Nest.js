import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'This will return all movies';
    }

    @Get('/search')
    search(@Query('year') movieData: string) {
        return `searching for a movie made after: ${movieData}`
    }

    @Get('/:id')
    getOne(@Param('id') movieId: string) {
        return `This will return one movie: ${movieId}`;
    }

    @Post()
    create(@Body() movieData) {
        return `This will create a movies: ${movieData.name}/${movieData.director}`;
    }

    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() movieDate) {
        return {
            movieNumber: movieId,
            ...movieDate
        };
    }

    @Delete('/:id')
    remove(@Param('id') movieId: string) {
        return `This will remove a movie: ${movieId}`;
    }
}
