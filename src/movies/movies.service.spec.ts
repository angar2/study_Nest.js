import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('shoule return a movie', () =>{
      service.create({
        title: 'apple',
        year: 2000,
        genres: ['fruit'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined;
    });

    it('should throw  a NotFoundException', () => {
      try {
        service.getOne(9999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'apple',
        year: 2000,
        genres: ['fruit'],
      });
      const beforeRemove = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(beforeRemove);
    });

    it('should throw  a NotFoundException', () => {
      try {
        service.remove(9999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'apple',
        year: 2000,
        genres: ['fruit'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'apple',
        year: 2000,
        genres: ['fruit'],
      });
      service.patch(1, {title: "Update test"});
      const movie = service.getOne(1)
      expect(movie.title).toEqual("Update test");
    });

    it('should throw a NotFoundException', () => {
      try {
        service.patch(9999, {title: "Update test"});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

});
