import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Сделать шаблон письма',
    description: 'Заголовок',
  })
  title?: string;

  @ApiProperty({
    example: 1,
    description: 'Позиция в столбце',
  })
  order?: number;

  @ApiProperty({
    example: 'До 12 часов подготовить шаблон письма для клиента',
    description: 'Описание',
  })
  description?: string;

  @ApiProperty({
    example: '18af7b72-ea23-43fb-864d-0eca2d682b08',
    description: 'ID пользователя',
  })
  userId: string | null = null;

  @ApiProperty({
    example: '64e6599d-1dfb-4163-b467-ec8d74cf1b46',
    description: 'ID доски',
  })
  boardId: string | null = null;

  @ApiProperty({
    example: '2b1398db-16bc-4fec-8f7d-8a469e1b90a6',
    description: 'ID столбца на доске',
  })
  columnId: string | null = null;
}
