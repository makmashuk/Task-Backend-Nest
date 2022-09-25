import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../entities/movies.entity';
import { MoviesService } from '../service/movies.service';
import { MoviesController } from './movies.controller';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: 'MovieRepository',
          useClass: Movie,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('-- MoviesController -- create', () => {
    const mockParameters = {
      title: expect.any(String),
      genre: expect.any(String),
    };
    const user = {
      username: expect.any(String),
      id: expect.any(Number),
    };
    it('should return an entity of movie if successful', async () => {
      const expectedResult = new Movie();
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      expect(await controller.create(mockParameters, user)).toBe(
        expectedResult,
      );
    });
    it('should throw InternalServerError', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(controller.create(mockParameters, user)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  describe('-- MoviesController -- findAll', () => {
    const user = {
      username: expect.any(String),
      id: expect.any(Number),
    };
    it('should return array of movie and count if successful', async () => {
      const expectedResult = [[], 0];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult as any);
      // expect(spyFunction).toHaveBeenCalled();
      expect(await controller.findAll(user)).toBe(expectedResult);
    });
    it('should throw InternalServerError', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(controller.findAll(user)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
afterEach(() => {
  jest.resetAllMocks();
});
