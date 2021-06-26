import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import { Board } from './Board';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('integer')
  order: number;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user: User) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: string | null; // User identifier

  @Column('varchar', { nullable: true })
  boardId: string | null;

  @ManyToOne(() => Board, (board: Board) => board.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  board!: string | null;

  @Column('varchar', { nullable: true })
  columnId: string | null;

  constructor({
    id = uuidv4(),
    title = 'Task',
    description = 'Description',
    order = 0,
    userId = null,
    boardId = null,
    columnId = null,
  }: Partial<Task> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
