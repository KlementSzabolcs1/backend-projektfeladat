import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { ToDoService } from './to-do.service';

describe('ToDoService', () => {
  let service: ToDoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ ToDoService, {
        provide: getRepositoryToken(ToDo),
        useValue: {
          save: jest.fn()
        }
      }]
    }).compile();

    service = module.get<ToDoService>(ToDoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
