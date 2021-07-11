import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
  @ApiProperty({
    example: 'ToDo',
    description: 'Название столбца',
  })
  readonly title: string = 'Task';

  @ApiProperty({
    example: 0,
    description: 'Порядковый номер на доску',
  })
  readonly order: number = 0;
}
