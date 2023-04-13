import { Test, TestingModule } from '@nestjs/testing';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { ToDo } from './entities/to-do.entity';
import { UpdateToDoDto } from './dto/update-to-do.dto';

describe('ToDoController', () => {
  let controller: ToDoController;
  let service: ToDoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [ToDoService],
    }).compile();

    controller = module.get<ToDoController>(ToDoController);
    service = module.get<ToDoService>(ToDoService);
  });

  describe('create', () => {
    it('should create a new ToDo', async () => {
      const todo: ToDo = {
        id: 1,
        name: 'asd1',
        password: 'asd1',
        reg_date: new Date(),
      };
      const dto: CreateToDoDto = {
        id: 2,
        name: 'asd2',
        password: 'asd2',
        reg_date: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(todo);
      expect(await controller.create(dto)).toBe(todo);
    });
  });

  describe('findAll', () => {
    it('should return an array of ToDos', async () => {
      const todos: ToDo[] = [
        {
          id: 1,
          name: 'asd1',
          password: 'asd1',
          reg_date: new Date(),
        },
        {
          id: 2,
          name: 'asd2',
          password: 'asd2',
          reg_date: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(todos);
      expect(await controller.findAll()).toBe(todos);
    });
  });
  describe('findOne', () => {
    it('should return a single ToDo object', async () => {
      const expectedToDo: ToDo = { id: 1, name: 'Test ToDo', password: 'test', reg_date: new Date() };
      jest.spyOn(service, 'findOne').mockImplementation(async () => expectedToDo);

      const result: ToDo = await controller.findOne(1);

      expect(result).toEqual(expectedToDo);
    });
  });
});
