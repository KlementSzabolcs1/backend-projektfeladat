import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ToDo } from './entities/to-do.entity';
import { ToDoService } from './to-do.service';

describe('ToDoService', () => {
  let toDoService: ToDoService;
  let toDoRepo: Repository<ToDo>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ToDoService,
        {
          provide: getRepositoryToken(ToDo),
          useClass: Repository,
        },
      ],
    }).compile();

    toDoService = moduleRef.get<ToDoService>(ToDoService);
    toDoRepo = moduleRef.get<Repository<ToDo>>(getRepositoryToken(ToDo));
  });

  describe('create', () => {
    it('should create a new to-do item', async () => {
      const createToDoDto: CreateToDoDto = {
        id: 1,
        name: 'asd1',
        password: 'asd1',
        reg_date: new Date(),
      };
      const toDo: ToDo = {
        ...createToDoDto,
        id: 1,
        name: 'asd2',
        password: 'asd2',
        reg_date: new Date(),
      };
      jest.spyOn(toDoRepo, 'save').mockResolvedValueOnce(toDo);

      const result = await toDoService.create(createToDoDto);

      expect(toDoRepo.save).toHaveBeenCalledWith(createToDoDto);
      expect(result).toEqual(toDo);
    });
  });

  describe('findAll', () => {
    it('should return an array of to-do items', async () => {
      const toDo1: ToDo = {
        id: 1,
        name: 'asd1',
        password: 'password',
        reg_date: new Date(),
      };
      const toDo2: ToDo = {
        id: 2,
        name: 'asd2',
        password: 'password',
        reg_date: new Date(),
      };
      const toDoArray: ToDo[] = [toDo1, toDo2];
      jest.spyOn(toDoRepo, 'find').mockResolvedValueOnce(toDoArray);

      const result = await toDoService.findAll();

      expect(toDoRepo.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(toDoArray);
    });
  });

  describe('findOne', () => {
    it('should return a to-do item with the specified id', async () => {
      const id = 1;
      const toDo: ToDo = {
        id: 2,
        name: 'asd',
        password: 'password',
        reg_date: new Date(),
      };
      jest.spyOn(toDoRepo, 'findOne').mockResolvedValueOnce(toDo);

      const result = await toDoService.findOne(id);

      expect(toDoRepo.findOne).toHaveBeenCalledTimes(1);
      expect(toDoRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(toDo);
    });
  });

  describe('update', () => {
    it('should update a to-do item with the specified id', async () => {
      const id = 1;
      const createToDoDto: CreateToDoDto = {
        id: 1,
        name: 'asd1',
        password: 'asd1',
        reg_date: new Date(),
      };
      const toDo: ToDo = {
        id: 2,
        name: 'asd2',
        password: 'asd2',
        reg_date: new Date(),
      };
      const updatedToDo: ToDo = {
        id: 3,
        name: 'xdd1',
        password: 'xdd1',
        reg_date: new Date(),
      };
      jest.spyOn(toDoRepo, 'findOne').mockResolvedValueOnce(toDo);
      jest.spyOn(toDoRepo, 'update').mockResolvedValueOnce(undefined);
      jest.spyOn(toDoRepo, 'findOne').mockResolvedValueOnce(updatedToDo);

      const result = await toDoService.update(id, createToDoDto);

      expect(toDoRepo.findOne).toHaveBeenCalledTimes(2);
      expect(toDoRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(toDoRepo.update).toHaveBeenCalledTimes(1);
      expect(toDoRepo.update).toHaveBeenCalledWith({ id }, createToDoDto);
      expect(result).toEqual(updatedToDo);
    });
  });
});