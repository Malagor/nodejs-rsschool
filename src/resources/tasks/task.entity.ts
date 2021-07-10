import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, default: 'Task' })
  title = 'Task';

  @Column({ type: 'integer', default: 0 })
  order = 0;

  @Column({ type: 'varchar', default: '' })
  description = '';

  @Column({ type: 'varchar', default: null, nullable: true })
  userId: string | null = null;

  @Column({ type: 'varchar', default: null, nullable: true })
  boardId: string | null = null;

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
