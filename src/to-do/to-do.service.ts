import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ToDo } from './entities/to-do.entity';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private toDoRepo: Repository<ToDo>
  ){}

  async create(createToDoDto: CreateToDoDto): Promise<ToDo> {
    const res = await this.toDoRepo.save(createToDoDto);
    return res;
  }

  findAll() {
    return this.toDoRepo.find();
  }

  findOne(id: number) {
    return this.toDoRepo.findOne({ where: { id } });
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return this.toDoRepo.update({ id }, updateToDoDto);
  }

  remove(id: number) {
    return this.toDoRepo.delete({ id });
  }
}
