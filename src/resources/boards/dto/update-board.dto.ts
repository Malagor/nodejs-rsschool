import { ApiProperty } from '@nestjs/swagger';
import { Column } from '../column.model';

export class UpdateBoardDto {
  @ApiProperty({
    example: 'Проектные работы',
    description: 'Заголовок доски',
  })
  readonly title: string = 'Board';

  @ApiProperty({
    example: [
      {
        title: 'TODO',
        order: 0,
      },
      {
        title: 'inProcess',
        order: 1,
      },
    ],
    description: 'Массив колонок',
  })
  readonly columns: Column[] = [];
}
