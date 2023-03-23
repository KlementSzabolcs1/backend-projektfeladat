import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ApiTags } from '@nestjs/swagger';
import { ToDo } from './entities/to-do.entity';

@ApiTags('todo')
@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  create(@Body() createToDoDto: CreateToDoDto): Promise<ToDo> {
    return this.toDoService.create(createToDoDto);
  }

  @Get()
  async findAll(): Promise<ToDo[]> {
    return await this.toDoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ToDo> {
    return await this.toDoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.toDoService.remove(id);
  }
}
