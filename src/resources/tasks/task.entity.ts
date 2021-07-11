import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';

@Entity({ name: 'task' })
export class Task {
  @ApiProperty({
    example: '1aa92e73-7d16-4a4d-bf26-f7cc51270059',
    description: 'Уникальный id задачи',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Сделать шаблон письма',
    description: 'Заголовок',
  })
  @Column({ type: 'varchar', length: 50, default: 'Task' })
  title = 'Task';

  @ApiProperty({
    example: 1,
    description: 'Позиция в столбце',
  })
  @Column({ type: 'integer', default: 0 })
  order = 0;

  @ApiProperty({
    example: 'До 12 часов подготовить шаблон письма для клиента',
    description: 'Описание',
  })
  @Column({ type: 'varchar', default: '' })
  description = '';

  @ApiProperty({
    example: '18af7b72-ea23-43fb-864d-0eca2d682b08',
    description: 'ID пользователя',
  })
  @Column({ type: 'varchar', default: null, nullable: true })
  userId: string | null = null;

  @ApiProperty({
    example: '64e6599d-1dfb-4163-b467-ec8d74cf1b46',
    description: 'ID доски',
  })
  @Column({ type: 'varchar', default: null, nullable: true })
  boardId: string | null = null;

  @ApiProperty({
    example: '2b1398db-16bc-4fec-8f7d-8a469e1b90a6',
    description: 'ID столбца на доске',
  })
  @Column({ type: 'varchar', default: null, nullable: true })
  columnId: string | null = null;

  @ManyToOne(() => User, (user: User) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: User; // UserEntity identifier

  @ManyToOne(() => Board, (board: Board) => board.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'boardId' })
  board!: string | null;
}
