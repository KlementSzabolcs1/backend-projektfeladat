import { PickType } from '@nestjs/swagger';
import { ToDo } from '../entities/to-do.entity';

//picktype creates a new custom type based off an existing one(ToDo)
export class CreateToDoDto extends PickType(ToDo, ['id', 'name', 'password', 'reg_date']) {};
