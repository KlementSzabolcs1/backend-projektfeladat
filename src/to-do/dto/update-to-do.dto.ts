import { PartialType } from '@nestjs/swagger';
import { CreateToDoDto } from './create-to-do.dto';

//Makes all the properties of a type optional
export class UpdateToDoDto extends PartialType(CreateToDoDto) {}